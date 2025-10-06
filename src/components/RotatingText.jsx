'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import './RotatingText.css';
import { pre } from 'motion/react-client';

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

const RotatingText = forwardRef((props, ref) => {
    const {
        texts,
        transition = { type: 'spring', damping: 25, stiffness: 300 },
        initial = { y: '100%', opacity: 0 },
        animate = { y: 0, opacity: 1 },
        exit = { y: '-120%', opacity: 0 },
        animatePresenceMode = 'wait',
        animatePresenceInitial = false,
        rotationInterval = 2000,
        staggerDuration = 0,
        staggerFrom = 'first',
        loop = true,
        auto = true,
        splitBy = 'characters',
        onNext,
        mainClassName,
        splitLevelClassName,
        elementLevelClassName,
        ...rest
    } = props;

    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const wrapperRef = useRef(null);
    const [bgWidth, setBgWidth] = useState(0);
    const nextTextRef = useRef(null);

    const splitIntoCharacters = text => {
        if (typeof Intl !== 'undefined' && Intl.Segmenter) {
            const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
            return Array.from(segmenter.segment(text), segment => segment.segment);
        }
        return Array.from(text);
    };

    const elements = useMemo(() => {
        const currentText = texts[currentTextIndex];
        if (splitBy === 'characters') {
            const words = currentText.split(' ');
            return words.map((word, i) => ({
                characters: splitIntoCharacters(word),
                needsSpace: i !== words.length - 1
            }));
        }
        if (splitBy === 'words') {
            return currentText.split(' ').map((word, i, arr) => ({
                characters: [word],
                needsSpace: i !== arr.length - 1
            }));
        }
        if (splitBy === 'lines') {
            return currentText.split('\n').map((line, i, arr) => ({
                characters: [line],
                needsSpace: i !== arr.length - 1
            }));
        }

        return currentText.split(splitBy).map((part, i, arr) => ({
            characters: [part],
            needsSpace: i !== arr.length - 1
        }));
    }, [texts, currentTextIndex, splitBy]);

    const getStaggerDelay = useCallback(
        (index, totalChars) => {
        const total = totalChars;
        if (staggerFrom === 'first') return index * staggerDuration;
        if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;
        if (staggerFrom === 'center') {
            const center = Math.floor(total / 2);
            return Math.abs(center - index) * staggerDuration;
        }
    // Compute a fixed random start index once per text change
    const randomStaggerIndex = useMemo(() => {
        if (staggerFrom !== 'random') return 0;
        const totalChars = elements.reduce((sum, word) => sum + word.characters.length, 0);
        return Math.floor(Math.random() * totalChars);
    }, [staggerFrom, elements]);

    const getStaggerDelay = useCallback(
        (index, totalChars) => {
            const total = totalChars;
            if (staggerFrom === 'first')   return index * staggerDuration;
            if (staggerFrom === 'last')    return (total - 1 - index) * staggerDuration;
            if (staggerFrom === 'center') {
                const center = Math.floor(total / 2);
                return Math.abs(center - index) * staggerDuration;
            }
            if (staggerFrom === 'random') {
                return Math.abs(randomStaggerIndex - index) * staggerDuration;
            }
            return Math.abs(staggerFrom - index) * staggerDuration;
        },
        [staggerFrom, staggerDuration, randomStaggerIndex]
    );        return Math.abs(staggerFrom - index) * staggerDuration;
        },
        [staggerFrom, staggerDuration]
    );

    useLayoutEffect(() => {
        if (wrapperRef.current) {
            setBgWidth(wrapperRef.current.offsetWidth);
        }
}, []);

    const handleIndexChange = useCallback(
        newIndex => {
            if (!wrapperRef.current || !nextTextRef.current) {
                setCurrentTextIndex(newIndex);
                return;
            }

            // Measure upcoming text width
            const paddingBuffer = 24; // Add some padding to avoid cutting off
            const newWidth = nextTextRef.current.offsetWidth + paddingBuffer;
            setBgWidth(newWidth);

            // Then change the text
            setCurrentTextIndex(newIndex);
            if (onNext) onNext(newIndex);
        },
        [onNext]
);
    const next = useCallback(() => {
        const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
        if (nextIndex !== currentTextIndex) {
            handleIndexChange(nextIndex);
        }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
        const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;
        if (prevIndex !== currentTextIndex) {
            handleIndexChange(prevIndex);
        }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
        index => {
            const validIndex = Math.max(0, Math.min(index, texts.length - 1));
            if (validIndex !== currentTextIndex) {
                handleIndexChange(validIndex);
            }
        },
        [texts.length, currentTextIndex, handleIndexChange]
    );

    const reset = useCallback(() => {
        if (currentTextIndex !== 0) {
            handleIndexChange(0);
        }
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(
        ref,
        () => ({
            next,
            previous,
            jumpTo,
            reset
        }),
        [next, previous, jumpTo, reset]
    );

    useEffect(() => {
        if (!auto) return;
        const intervalId = setInterval(next, rotationInterval);
        return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto]);

    return (
        <span className="rotating-text-wrapper">
            <span className="text-measure" ref={nextTextRef} style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                {texts[(currentTextIndex + 1) % texts.length]}
            </span>
            <motion.span
                className="rotating-text-bg"
                animate={{ width: bgWidth }}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
            />
            <span ref={wrapperRef}>
                <motion.span className={cn('text-rotate', mainClassName)} {...rest} layout transition={transition}>
                    <span className="text-rotate-sr-only">{texts[currentTextIndex]}</span>
                    <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
                        <motion.span
                            key={currentTextIndex}
                            className={cn(splitBy === 'lines' ? 'text-rotate-lines' : 'text-rotate')}
                            layout
                            aria-hidden="true"
                        >
                            {elements.map((wordObj, wordIndex, array) => {
                                const previousCharsCount = array.slice(0, wordIndex).reduce((sum, word) => sum + word.characters.length, 0);
                                return (
                                    <span key={wordIndex} className={cn('text-rotate-word', splitLevelClassName)}>
                                        {wordObj.characters.map((char, charIndex) => (
                                            <motion.span
                                                key={charIndex}
                                                initial={initial}
                                                animate={animate}
                                                exit={exit}
                                                transition={{
                                                    ...transition,
                                                    delay: getStaggerDelay(
                                                        previousCharsCount + charIndex,
                                                        array.reduce((sum, word) => sum + word.characters.length, 0)
                                                    )
                                                }}
                                                className={cn('text-rotate-element', elementLevelClassName)}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                        {wordObj.needsSpace && <span className="text-rotate-space"> </span>}
                                    </span>
                                );
                            })}
                        </motion.span>
                    </AnimatePresence>
                </motion.span>
            </span>
        </span>
    );
});

RotatingText.displayName = 'RotatingText';
export default RotatingText;


let audioContext: AudioContext | null = null;

const initializeAudio = () => {
    if (typeof window !== 'undefined' && !audioContext && (window.AudioContext || (window as any).webkitAudioContext)) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
};

const play = (
    type: OscillatorType,
    volume: number,
    frequency: number,
    duration: number,
    freqRamp: { to: number, time: number } | null = null
) => {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    if (freqRamp) {
        oscillator.frequency.exponentialRampToValueAtTime(freqRamp.to, audioContext.currentTime + freqRamp.time);
    }
    
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
};

export const playFlipSound = () => {
    initializeAudio();
    play('sine', 0.05, 800, 0.1, { to: 1200, time: 0.05 });
};

export const playMatchSound = () => {
    initializeAudio();
    if (!audioContext) return;
    setTimeout(() => play('triangle', 0.1, 600, 0.1), 0);
    setTimeout(() => play('triangle', 0.1, 800, 0.1), 80);
    setTimeout(() => play('triangle', 0.1, 1000, 0.1), 160);
};

export const playMismatchSound = () => {
    initializeAudio();
    play('square', 0.08, 200, 0.2, { to: 100, time: 0.2 });
};

export const initAudioContext = () => {
    initializeAudio();
    // For browsers that suspend the AudioContext by default
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
};

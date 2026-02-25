export class PRNG {
    private seed: number;
    constructor(seed: string | number) {
        if (typeof seed === 'string') {
            this.seed = this.hashString(seed);
        } else {
            this.seed = seed;
        }
    }

    private hashString(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    }

    next(): number {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    nextRange(min: number, max: number): number {
        return min + this.next() * (max - min);
    }
}

export function generateSeed(): string {
    return Math.random().toString(36).substring(2, 10);
}

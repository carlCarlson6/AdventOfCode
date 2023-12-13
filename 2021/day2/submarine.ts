export class Submarine1 {
    private depth: number;
    private horizontal: number;

    constructor() {
        this.depth = 0;
        this.horizontal = 0;
    }

    public get result(): number {
        return this.depth * this.horizontal;
    }

    executeCommand(command: string, increment: number): void {
        switch (command) {
            case 'up':
                this.executeUp(increment)
                break;
            case 'down':
                this.executeDown(increment)
                break
            case 'forward':
                this.executeForward(increment)
                break;
            default:
                break;
        }
    }

    private executeUp(increment: number): void {
        this.depth = this.depth - increment;
    }

    private executeDown(increment: number): void {
        this.depth = this.depth + increment;
    }

    private executeForward(increment: number): void {
        this.horizontal = this.horizontal + increment;
    }
}

export class Submarine2 {
    private depth: number;
    private horizontal: number;
    private aim: number;

    constructor() {
        this.depth = 0;
        this.horizontal = 0;
        this.aim = 0;
    }

    public get result(): number {
        return this.depth * this.horizontal;
    }

    executeCommand(command: string, increment: number): void {
        switch (command) {
            case 'up':
                this.executeUp(increment)
                break;
            case 'down':
                this.executeDown(increment)
                break
            case 'forward':
                this.executeForward(increment)
                break;
            default:
                break;
        }
    }

    private executeUp(increment: number): void {
        this.aim = this.aim - increment;
    }

    private executeDown(increment: number): void {
        this.aim = this.aim + increment;
    }

    private executeForward(increment: number): void {
        this.horizontal = this.horizontal + increment;
        this.depth = this.depth + this.aim*increment;
    }
}
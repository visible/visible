import { EventEmitter } from 'eventemitter3';

export interface EventMaps {
  progress: [
    {
      progress: number;
    },
  ];
}

export class RuleProgressEmitter extends EventEmitter<EventMaps> {
  private lastProgress = 0;

  emitProgress() {
    this.lastProgress++;
    this.emit('progress', { progress: this.lastProgress });
  }
}

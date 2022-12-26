import { EventEmitter } from 'events';
import TypedEmitter from 'typed-emitter';

import { TradingViewAPI } from './TradingViewAPI';
import { TickerData } from './interfaces/TickerData';

type MessageEvents = {
  newListener: () => void;
  update: (tickerData: TickerData) => void;
};

export class TickerSubscription extends (EventEmitter as new () => TypedEmitter<MessageEvents>) {
  simpleOrProName: string;
  due!: number;
  private api: TradingViewAPI;
  public tickerData!: TickerData;
  destroyed = false;

  constructor(api: TradingViewAPI, simpleOrProName: string) {
    super();
    this.api = api;
    this.simpleOrProName = simpleOrProName;
    this.refreshDue();
    this.on('newListener', () => {
      if (this.destroyed) {
        this.destroyed = false;
        this.api.ensureRegistered(this);
      }
    });
  }

  public updateData(tickerDataPatch: TickerData) {
    this.tickerData = {
      ...this.tickerData,
      ...tickerDataPatch,
      last_updated: new Date()
    };
    this.emit('update', this.tickerData);
  }

  public async fetch(): Promise<TickerData> {
    this.refreshDue();
    await this.api.ensureRegistered(this);
    return this.tickerData;
  }

  public get canBeDestroyed() {
    return this.due < Date.now() && this.listenerCount('update') === 0;
  }

  private refreshDue() {
    this.due = Date.now() + 5000;
  }
}

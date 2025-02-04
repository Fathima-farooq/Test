import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExpandCollapseService {
  private expandedState: { [key: string]: boolean } = {};

  getState(key: string): boolean {
    return this.expandedState[key] || false;
  }

  toggleState(key: string): void {
    this.expandedState[key] = !this.expandedState[key];
  }
}

import { Component } from 'vue'

declare module 'vue' {
  export interface GlobalComponents {
    BaseButton: Component
    IconBolt: Component
  }
}

export {}

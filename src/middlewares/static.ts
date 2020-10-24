import express, { Application } from 'express';
import Local from '../providers/local';

export default class Static implements Middleware {
  public static mount(application: Application): void {
    application.use(express.static('dist/client', { maxAge: Local.CACHE }));
  }
}

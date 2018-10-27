import * as SparkMD5_ from 'spark-md5';
import { Observable, Observer } from 'rxjs';

const SparkMD5 = SparkMD5_;

export const CHUNK_SIZE = 2097152;

export interface IChecksumGeneratorResult {
  filename: string;
  percentage: number;
  fingerprint?: string;
}

export class ChecksumGenerator {

  public observable: Observable<IChecksumGeneratorResult>;
  public observer: Observer<IChecksumGeneratorResult>;
  public spark = new SparkMD5.ArrayBuffer();
  public sliceMethod: Function;
  public fileReader: FileReader;
  public chunkSize = CHUNK_SIZE;
  public numChunks: number;
  public singleChunkPercentage: number;
  public currentChunk = 0;
  public result: IChecksumGeneratorResult = {
    filename: this.file.name,
    percentage: 0
  };

  constructor(
    private file: File,
    private blobFunction: any = Blob
  ) {
    this.numChunks = this.calculateNumChunks(this.file.size);
    this.singleChunkPercentage = this.calculateSingleChunkPercentage(this.numChunks);
    this.defineSliceMethod();
    this.start();
  }

  public calculateNumChunks(fileSize: number): number {
    return fileSize / this.chunkSize;
  }

  public calculateSingleChunkPercentage(numChunks: number): number {
    return 100 / numChunks;
  }

  public defineSliceMethod(): void {
    this.sliceMethod = new this.blobFunction()['slice']
      || new this.blobFunction()['mozSlice']
      || new this.blobFunction()['webkitSlice'];
  }

  public start(): void {
    this.observable = Observable.create(observer => {
      this.observer = observer;
      this.loadNext();
    });
  }

  public get(): Observable<IChecksumGeneratorResult> {
    return this.observable;
  }

  public loadNext(): void {
    this.fileReader = new FileReader();
    this.fileReader.onload = this.onloadHandler.bind(this);
    this.fileReader.onerror = this.onerrorHandler.bind(this);
    const start = this.calculateChunkStart(this.currentChunk);
    const end = this.calculateChunkEnd(start);
    this.fileReader.readAsArrayBuffer(
      this.sliceMethod.call(this.file, start, end)
    );
  }

  public calculateChunkStart(currentChunk: number): number {
    return currentChunk * this.chunkSize;
  }

  public calculateChunkEnd(start: number): number {
    return (start + this.chunkSize >= this.file.size)
      ? this.file.size
      : start + this.chunkSize;
  }

  public calculatePercentageDone(currentChunk: number): number {
    return currentChunk * this.singleChunkPercentage;
  }

  public onloadHandler(): void {
    this.spark.append(this.fileReader.result as ArrayBuffer);
    this.currentChunk++;
    if (this.currentChunk < this.numChunks) {
      this.loadNext();
      this.result.percentage = this.calculatePercentageDone(this.currentChunk);
      // console.log('current percentage is ==>', this.result.percentage);
    } else {
      this.result.percentage = 100;
      this.result.fingerprint = this.spark.end();
      // console.log('finished ==>', this.result);
    }

    this.observer.next(this.result);
    if (this.result.fingerprint) {
      this.observer.complete();
    }
  }

  public onerrorHandler(e: Error): void {
    console.error(e);
  }
}

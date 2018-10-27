import { ChecksumGenerator, CHUNK_SIZE } from './checksum.generator';

const makeString = (length: number = 5) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const makeFile = (fileSize: number) => {
  const text = makeString(fileSize);
  return new File(
    [ text ],
    'mockfile.txt',
    { type: 'text/plain' }
  );
};

describe('ChecksumGenerator', () => {
  let checksumGenerator: ChecksumGenerator;

  beforeEach(() => {
    checksumGenerator = new ChecksumGenerator(
      makeFile(CHUNK_SIZE + 1000)
    );
  });

  it('Should be created', () => {
    expect(checksumGenerator).toBeTruthy();
  });

  it('Should define the property "observable"', () => {
    expect(checksumGenerator.observable).toBeTruthy();
  });

  it('Should define the property "observer", as soon as observable is subscribed', (done) => {
    const checksumGeneratorAsync = new ChecksumGenerator(
      makeFile(CHUNK_SIZE)
    );
    checksumGeneratorAsync.get().subscribe(result => {
      expect(checksumGeneratorAsync.observer).toBeTruthy();
      done();
    });
  });

  it('Should define the correct slice-method in standard browsers', () => {
    const mockBlobFunction = () => {
      return {
        slice: () => {}
      };
    };
    checksumGenerator = new ChecksumGenerator(
      makeFile(CHUNK_SIZE + 1000),
      mockBlobFunction
    );
    expect(checksumGenerator.sliceMethod.name).toBe('slice');
  });

  it('Should define the correct slice-method in mozilla browsers', () => {
    const mockBlobFunction = () => {
      return {
        mozSlice: () => {}
      };
    };
    checksumGenerator = new ChecksumGenerator(
      makeFile(CHUNK_SIZE + 1000),
      mockBlobFunction
    );
    expect(checksumGenerator.sliceMethod.name).toBe('mozSlice');
  });

  it('Should define the correct slice-method in safari browsers', () => {
    const mockBlobFunction = () => {
      return {
        webkitSlice: () => {}
      };
    };
    checksumGenerator = new ChecksumGenerator(
      makeFile(CHUNK_SIZE + 1000),
      mockBlobFunction
    );
    expect(checksumGenerator.sliceMethod.name).toBe('webkitSlice');
  });

  it('Should calculate the next startpoint depending on currentChunk', () => {
    const resultFor0 = checksumGenerator.calculateChunkStart(0);
    expect(resultFor0).toBe(0);
    const resultFor1 = checksumGenerator.calculateChunkStart(1);
    expect(resultFor1).toBe(CHUNK_SIZE);
  });

  it('Should return filesize if start + chunkSize is larger than file', () => {
    checksumGenerator = new ChecksumGenerator(
      makeFile(CHUNK_SIZE)
    );
    const result = checksumGenerator.calculateChunkEnd(100);
    expect(result).toBe(CHUNK_SIZE);
  });

  it('Should return the next endpoint if start + chunkSize is smaller than file', () => {
    checksumGenerator = new ChecksumGenerator(
      makeFile(CHUNK_SIZE * 3)
    );
    const result = checksumGenerator.calculateChunkEnd(CHUNK_SIZE);
    expect(result).toBe(CHUNK_SIZE * 2);
  });

  it('Should calculate the number of chunks in total', () => {
    const result = checksumGenerator.calculateNumChunks(
      CHUNK_SIZE * 2
    );
    expect(result).toBe(2);
  });

  it('Should calculate the percentage of a single chunk', () => {
    expect(checksumGenerator.calculateSingleChunkPercentage(10)).toBe(10);
    expect(checksumGenerator.calculateSingleChunkPercentage(5)).toBe(20);
  });

  it('Should calculate the percentage of chunks already having a checksum', () => {
    checksumGenerator.singleChunkPercentage = 10;
    expect(
      checksumGenerator.calculatePercentageDone(1)
    ).toBe(10);
    expect(
      checksumGenerator.calculatePercentageDone(3)
    ).toBe(30);
  });

  it('Should call sparks append method', (done) => {
    const checksumGeneratorAsync = new ChecksumGenerator(
      makeFile(CHUNK_SIZE)
    );
    const spySparkAppend: jasmine.Spy = spyOn(checksumGeneratorAsync.spark, 'append');
    checksumGeneratorAsync.get().subscribe(result => {
      expect(spySparkAppend).toHaveBeenCalled();
      done();
    });
  });

  it('Should raise the currentChunk property', (done) => {
    const checksumGeneratorAsync = new ChecksumGenerator(
      makeFile(CHUNK_SIZE)
    );
    checksumGeneratorAsync.get().subscribe(result => {
      expect(checksumGeneratorAsync.currentChunk).toBe(1);
      done();
    });
  });

  it('Should set correct percentage on result-object if currentChunk is smaller that numChunks', (done) => {
    const numChunks = 3;
    const checksumGeneratorAsync = new ChecksumGenerator(
      makeFile(CHUNK_SIZE * numChunks)
    );
    checksumGeneratorAsync.get().subscribe(result => {
      expect(checksumGeneratorAsync.result.percentage).toBe(100 / numChunks);
      done();
    });
  });

  it('Should log a message with error-level to console', () => {
    const spyConsoleError: jasmine.Spy = spyOn(console, 'error');
    const mockError = new Error('Mock Error');
    checksumGenerator.onerrorHandler(mockError);
    expect(spyConsoleError).toHaveBeenCalledWith(mockError);
  });

  it('Should create the correct md5sum!', (done) => {
    const checksumGeneratorAsync = new ChecksumGenerator(
      new File(
        [ 'Q8iRrE8bh7mMblQtrgzkRCDAnjXaPi92i8meeJZiJ7SFi7Ia2xogb7q4KhNbwHMVVRoqrcSRhNQ2hwcXJ9ODRIL9qfiFTYN1tz1svFhMZiBdp6VA' ],
        'mockfile.txt',
        { type: 'text/plain' }
      )
    );
    checksumGeneratorAsync.get().subscribe(result => {
      if (result.fingerprint) {
        expect(result.fingerprint).toBe('c02b0e0910be08ccf1c2690b01fa4c3b');
        done();
      }
    });
  });

});

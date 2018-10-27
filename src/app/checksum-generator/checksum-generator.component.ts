import { Component, OnInit } from '@angular/core';
import {
  ChecksumGenerator,
  IChecksumGeneratorResult
} from '@mralexandernickel/frontend-subjects';

@Component({
  selector: 'app-checksum-generator',
  templateUrl: './checksum-generator.component.html',
  styleUrls: ['./checksum-generator.component.styl']
})
export class ChecksumGeneratorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public generateChecksum($event): void {
    console.log('changed');
    // this.checksumService.generate($event.target.files);

    for (const file of $event.target.files) {
      const cg = new ChecksumGenerator(file);
      cg.get().subscribe((result: IChecksumGeneratorResult) => {
        console.log('subscribed', result);
      });
    }
  }

}

import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-videoeditor',
  templateUrl: './videoeditor.component.html',
  styleUrls: ['./videoeditor.component.scss'],
})
export class VideoeditorComponent {
  @ViewChild('videoPlayer') videoElement!: ElementRef<HTMLVideoElement>;
  activeMode: 'none' | 'filters' | 'trim' | 'quality' = 'none';
  setMode(mode: 'none' | 'filters' | 'trim' | 'quality') {
  this.activeMode = mode;
}
  videoSrc: string | null = null;
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  selectedFilter: string = ''; // Текущий фильтр
  trimStart: number = 0;
  trimEnd: number = 0;

  filtersList = [
  { name: 'Оригинал', class: '' },
  { name: 'Ч/Б', class: 'grayscale' },
  { name: 'Сепия', class: 'sepia' },
  { name: 'Инверсия', class: 'invert' },
  { name: 'Яркий', class: 'saturate' },
  { name: 'Резкость', class: 'sharpen' }
  ];
  applyFilter(filterClass: string) {
  this.selectedFilter = filterClass;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.videoSrc = URL.createObjectURL(file);
      this.videoElement.nativeElement.src = this.videoSrc;
      this.isPlaying = false;
    }
  }

  onTrimChange(event: any) {
  this.trimStart = event.detail.value.lower;
  this.trimEnd = event.detail.value.upper;
  
  // Если пользователь двигает начало — перематываем видео на этот момент для предпросмотра
  this.videoElement.nativeElement.currentTime = this.trimStart;
  }
  onMetadataLoaded() {
    this.duration = this.videoElement.nativeElement.duration;
    this.trimEnd = this.duration; // Изначально обрезка по всей длине
  }

  onTimeUpdate() {
    this.currentTime = this.videoElement.nativeElement.currentTime;
  }

  togglePlay() {
    const video = this.videoElement.nativeElement;
    video.paused ? video.play() : video.pause();
    this.isPlaying = !video.paused;
  }

  skip(seconds: number) {
    const video = this.videoElement.nativeElement;
    let newTime = video.currentTime + seconds;
    if (newTime < 0) newTime = 0;
    if (newTime > video.duration) newTime = video.duration;
    video.currentTime = newTime;
  }

  onSeek(event: any) {
    this.videoElement.nativeElement.currentTime = event.detail.value;
  }

  formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60) || 0;
    const secs = Math.floor(seconds % 60) || 0;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}

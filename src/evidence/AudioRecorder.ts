export class AudioRecorder {
  private recording = false;

  start() {
    this.recording = true;
    console.log("Audio recording started");
  }

  stop() {
    this.recording = false;
    console.log("Audio recording stopped");
  }

  isRecording() {
    return this.recording;
  }
}
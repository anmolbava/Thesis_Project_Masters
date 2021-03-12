from django import forms
# from speech_recognition import *
from threading import Thread, RLock

import pyaudio
import wave
import os
import time

FORMAT = pyaudio.paInt16
CHANNELS = 2
RATE = 44100
CHUNK = 1024
MAX_RECORD_SECONDS = 3600
WAVE_OUTPUT_FILENAME = os.path.join(".", "file.wav")

class MyForms(forms.Form):
    """ This class is usde to validate the form """
    pass

class RecordManager:
    """ This function is used to record voice of user """
    
    def __init__(self):
        """ The constructor of the class """
        self.recording_state = False
        self.audio = pyaudio.PyAudio()
    
    def startStopRecorder(self, new_state):
        """ This procedure is used to start and stop the recording of the microphone. """
        if new_state == "start":
            # Start recording here
            self.recording_state = True
            
            #Start the recorded thread
            thread = Thread(target = self.recordMicrophone, args=(), daemon = True)
            thread.start()
        else:
            # Stop recording
            self.recording_state = False
    
    def recordMicrophone(self):
        """ This procedure is used to record the microphone. """       
        had_recorded = False 
        stream = self.audio.open(format=FORMAT, channels=CHANNELS,
                        rate=RATE, input=True,
                        frames_per_buffer=CHUNK)
        frames = []
        start_time = time.time()
        #Record microphone
        while self.recording_state == True and MAX_RECORD_SECONDS <= time.time() - start_time:
            data = stream.read(CHUNK)
            frames.append(data)
            had_recorded = True
        
        #Stop recording
        if self.recording_state == False:
            stream.stop_stream()
            stream.close()
            self.audio.terminate()
            
        #Save recorded sound
        if had_recorded == True: 
            waveFile = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
            waveFile.setnchannels(CHANNELS)
            waveFile.setsampwidth(self.audio.get_sample_size(FORMAT))
            waveFile.setframerate(RATE)
            waveFile.writeframes(b''.join(frames))
            waveFile.close()
    
class RecognizerObject:
    """ This function is used to convert the recorded voice of user to text """
    pass
    

    
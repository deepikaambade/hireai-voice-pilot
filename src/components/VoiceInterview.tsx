
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Mic, MicOff, Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';

const VoiceInterview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [interviewProgress, setInterviewProgress] = useState(25);

  const questions = [
    "Tell me about yourself and your experience with React development.",
    "How do you handle state management in large applications?",
    "Describe a challenging project you worked on and how you solved it.",
    "What's your approach to testing and code quality?"
  ];

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    console.log('Voice recording:', isRecording ? 'stopped' : 'started');
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    console.log('Audio playback:', isPlaying ? 'paused' : 'playing');
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setInterviewProgress((currentQuestion + 2) / questions.length * 100);
    }
  };

  const restartQuestion = () => {
    setIsRecording(false);
    setIsPlaying(false);
    console.log('Question restarted');
  };

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Mic className="w-5 h-5 mr-2 text-blue-400" />
            AI Voice Interview
          </CardTitle>
          <Badge className="bg-blue-600/20 text-blue-300">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-200 text-sm">Interview Progress</span>
            <span className="text-white text-sm font-medium">{Math.round(interviewProgress)}%</span>
          </div>
          <Progress value={interviewProgress} className="h-2" />
        </div>

        {/* Current Question */}
        <div className="p-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg border border-white/10">
          <h4 className="text-white font-medium mb-2">Current Question:</h4>
          <p className="text-blue-100 text-lg leading-relaxed">{questions[currentQuestion]}</p>
        </div>

        {/* Voice Controls */}
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="outline"
            size="lg"
            onClick={togglePlayback}
            className="border-white/20 text-white hover:bg-white/10"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isPlaying ? 'Pause' : 'Play Question'}
          </Button>

          <Button
            size="lg"
            onClick={toggleRecording}
            className={`${
              isRecording 
                ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                : 'bg-blue-600 hover:bg-blue-700'
            } px-8`}
          >
            {isRecording ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={restartQuestion}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <RotateCcw className="w-5 h-5" />
            Restart
          </Button>
        </div>

        {/* Recording Status */}
        {isRecording && (
          <div className="text-center p-4 bg-red-600/10 rounded-lg border border-red-500/20">
            <div className="flex items-center justify-center space-x-2 text-red-300">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span>Recording in progress... Speak clearly into your microphone</span>
            </div>
          </div>
        )}

        {/* AI Feedback */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-white/5 rounded-lg text-center">
            <div className="text-green-400 text-2xl font-bold">85%</div>
            <p className="text-blue-200 text-sm">Clarity Score</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg text-center">
            <div className="text-blue-400 text-2xl font-bold">92%</div>
            <p className="text-blue-200 text-sm">Confidence</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg text-center">
            <div className="text-purple-400 text-2xl font-bold">2.3m</div>
            <p className="text-blue-200 text-sm">Response Time</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button 
            variant="ghost" 
            className="text-blue-300 hover:text-white"
            disabled={currentQuestion === 0}
          >
            Previous Question
          </Button>
          <Button 
            onClick={nextQuestion}
            className="bg-green-600 hover:bg-green-700"
            disabled={currentQuestion === questions.length - 1}
          >
            {currentQuestion === questions.length - 1 ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete Interview
              </>
            ) : (
              'Next Question'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceInterview;

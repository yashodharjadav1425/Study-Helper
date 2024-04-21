import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function VideoPlayer() {
  const { id } = useParams(); // Get the id parameter from the URL
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(`/assets/videos.json`, {
          headers: {
            'Cache-Control': 'max-age=3600', // Cache response for 1 hour
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch video details');
        }
        const videos = await response.json();

        const selectedVideo = videos.find((video) => video.id === parseInt(id)); // Ensure id is parsed as integer
        if (selectedVideo) {
          setVideo(selectedVideo);
        } else {
          throw new Error('Video not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching video details:', error);
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [id]);

  useEffect(() => {
    const storedProgress = localStorage.getItem(`video_progress_${id}`);
    if (storedProgress) {
      setProgress(parseFloat(storedProgress));
    }
  }, [id]);

  const updateProgress = (event) => {
    const currentTime = event.target.currentTime;
    const duration = event.target.duration;
    const calculatedProgress = (currentTime / duration) * 100;
    setProgress(calculatedProgress);
    localStorage.setItem(`video_progress_${id}`, calculatedProgress.toFixed(2));
  };

  const generateQuiz = () => {
    // Logic to generate quiz goes here
    window.location.href = '/QuizPage';
    console.log('Quiz generated!');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className="text-center">
      <h2>{video.description}</h2>
      <video controls className="mx-auto" style={{ maxWidth: '100%', maxHeight: '80vh' }} onTimeUpdate={updateProgress}>
        <source src={video.videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <progress value={progress} max="100" style={{ width: '100%' }} />
      <p>Progress: {progress.toFixed(2)}%</p>
      <button className="btn btn-primary mt-3 me-2" onClick={generateQuiz}>Generate Quiz</button>
      <button className="btn btn-primary mt-3 " onClick={generateQuiz}>Generate Transcript</button>
    </div>
  );
}

export default VideoPlayer;

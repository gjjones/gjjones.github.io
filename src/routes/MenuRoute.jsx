import { useNavigate } from '@tanstack/react-router';
import { LessonMenu } from '../components/LessonMenu';

export function MenuRoute() {
  const navigate = useNavigate();

  const handleSelectLesson = (lessonId) => {
    navigate({ to: `/quiz/${lessonId}` });
  };

  return <LessonMenu onSelectLesson={handleSelectLesson} />;
}

import { useNavigate } from '@tanstack/react-router';
import { MainMenu } from '../components/MainMenu';

export function MenuRoute() {
  const navigate = useNavigate();

  const handleSelectQuiz = (quizId) => {
    navigate({ to: `/quiz/${quizId}` });
  };

  return <MainMenu onSelectQuiz={handleSelectQuiz} />;
}

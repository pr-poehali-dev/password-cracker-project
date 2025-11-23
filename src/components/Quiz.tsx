import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizProps {
  lessonId: number;
  onComplete: (score: number) => void;
}

const Quiz = ({ lessonId, onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: 'Что такое JSX в React?',
      options: [
        'Язык программирования',
        'Синтаксическое расширение JavaScript',
        'Библиотека для стилизации',
        'Фреймворк для тестирования'
      ],
      correctAnswer: 1,
      explanation: 'JSX — это синтаксическое расширение JavaScript, которое позволяет писать HTML-подобный код в JavaScript.'
    },
    {
      id: 2,
      question: 'Какой хук используется для управления состоянием в функциональных компонентах?',
      options: [
        'useEffect',
        'useState',
        'useContext',
        'useReducer'
      ],
      correctAnswer: 1,
      explanation: 'useState — это основной хук для управления локальным состоянием в функциональных компонентах.'
    },
    {
      id: 3,
      question: 'Что возвращает компонент React?',
      options: [
        'Строку',
        'Число',
        'JSX элемент',
        'Массив данных'
      ],
      correctAnswer: 2,
      explanation: 'Компонент React возвращает JSX элемент, который описывает, что должно быть отрендерено на экране.'
    },
    {
      id: 4,
      question: 'Для чего используется TypeScript в React проектах?',
      options: [
        'Для ускорения работы приложения',
        'Для статической типизации кода',
        'Для создания стилей',
        'Для работы с API'
      ],
      correctAnswer: 1,
      explanation: 'TypeScript добавляет статическую типизацию в JavaScript, что помогает находить ошибки на этапе разработки.'
    },
    {
      id: 5,
      question: 'Что такое props в React?',
      options: [
        'Глобальное состояние приложения',
        'Параметры, передаваемые в компонент',
        'Методы жизненного цикла',
        'Стили компонента'
      ],
      correctAnswer: 1,
      explanation: 'Props (properties) — это параметры, которые передаются в компонент для настройки его поведения и отображения.'
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    const isCorrect = answerIndex === quizQuestions[currentQuestion].correctAnswer;
    setAnswers([...answers, isCorrect]);
    
    if (isCorrect) {
      setScore(score + 1);
      toast.success('Правильно! 🎉', {
        description: quizQuestions[currentQuestion].explanation
      });
    } else {
      toast.error('Неправильно', {
        description: quizQuestions[currentQuestion].explanation
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      onComplete(Math.round((score / quizQuestions.length) * 100));
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setIsAnswered(false);
  };

  if (showResult) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const passed = percentage >= 70;

    return (
      <Card className="animate-scale-in border-2">
        <CardHeader className="text-center pb-4">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Icon name={passed ? "Trophy" : "Target"} size={40} className="text-white" />
          </div>
          <CardTitle className="text-2xl">
            {passed ? 'Поздравляем! 🎉' : 'Попробуйте ещё раз'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-primary mb-2">{percentage}%</div>
            <p className="text-muted-foreground text-lg">
              {score} из {quizQuestions.length} правильных ответов
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Результат</span>
              <span className="font-semibold">{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-3" />
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle2" size={20} className="text-green-500" />
                <span className="text-sm">Правильных ответов</span>
              </div>
              <span className="font-semibold text-green-500">{score}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="XCircle" size={20} className="text-red-500" />
                <span className="text-sm">Неправильных ответов</span>
              </div>
              <span className="font-semibold text-red-500">{quizQuestions.length - score}</span>
            </div>
          </div>

          {passed ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-800 font-medium">
                Отличная работа! Вы успешно прошли тест.
              </p>
            </div>
          ) : (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
              <p className="text-orange-800 font-medium">
                Для прохождения теста нужно набрать минимум 70%
              </p>
            </div>
          )}

          <div className="flex gap-3">
            {!passed && (
              <Button onClick={handleRetry} variant="outline" className="flex-1" size="lg">
                <Icon name="RotateCcw" size={20} className="mr-2" />
                Пройти заново
              </Button>
            )}
            <Button 
              onClick={() => onComplete(percentage)} 
              className="flex-1" 
              size="lg"
              disabled={!passed}
            >
              <Icon name="ArrowRight" size={20} className="mr-2" />
              {passed ? 'Продолжить' : 'Тест не пройден'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <Card className="animate-fade-in border-2">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="text-base px-4 py-1">
            Вопрос {currentQuestion + 1} из {quizQuestions.length}
          </Badge>
          <div className="flex items-center gap-2">
            <Icon name="Brain" size={20} className="text-primary" />
            <span className="font-semibold text-primary">Тест</span>
          </div>
        </div>
        <Progress value={progress} className="h-2 mb-6" />
        <CardTitle className="text-xl leading-relaxed">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrect = isAnswered && isCorrect;
            const showWrong = isAnswered && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showWrong
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-accent/50'
                } ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold ${
                    showCorrect
                      ? 'bg-green-500 text-white'
                      : showWrong
                      ? 'bg-red-500 text-white'
                      : isSelected
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {showCorrect ? (
                      <Icon name="Check" size={20} />
                    ) : showWrong ? (
                      <Icon name="X" size={20} />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span className={`flex-1 ${
                    showCorrect ? 'text-green-900 font-medium' : showWrong ? 'text-red-900' : ''
                  }`}>
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="pt-4 animate-fade-in">
            <Button onClick={handleNext} size="lg" className="w-full">
              {currentQuestion < quizQuestions.length - 1 ? (
                <>
                  Следующий вопрос
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </>
              ) : (
                <>
                  Завершить тест
                  <Icon name="CheckCircle2" size={20} className="ml-2" />
                </>
              )}
            </Button>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 pt-2">
          {quizQuestions.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index < currentQuestion
                  ? answers[index]
                    ? 'w-8 bg-green-500'
                    : 'w-8 bg-red-500'
                  : index === currentQuestion
                  ? 'w-12 bg-primary'
                  : 'w-8 bg-muted'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Quiz;

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import Quiz from '@/components/Quiz';

const CoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScores, setQuizScores] = useState<Record<number, number>>({});

  const course = {
    id: Number(id),
    title: 'Веб-разработка: React и TypeScript',
    description: 'Создавайте современные веб-приложения с React, TypeScript и лучшими практиками',
    category: 'Веб-разработка',
    level: 'Средний',
    duration: '10 недель',
    rating: 4.9,
    students: 8921,
    instructor: 'Александр Иванов',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    modules: [
      {
        id: 1,
        title: 'Введение в React',
        lessons: [
          { id: 1, title: 'Что такое React?', duration: '12:30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 2, title: 'Создание первого компонента', duration: '18:45', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 3, title: 'JSX и его особенности', duration: '15:20', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        ]
      },
      {
        id: 2,
        title: 'TypeScript основы',
        lessons: [
          { id: 4, title: 'Типизация в TypeScript', duration: '20:15', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 5, title: 'Интерфейсы и типы', duration: '16:40', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 6, title: 'Generics в TypeScript', duration: '22:10', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        ]
      },
      {
        id: 3,
        title: 'Работа со состоянием',
        lessons: [
          { id: 7, title: 'useState Hook', duration: '14:25', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 8, title: 'useEffect и жизненный цикл', duration: '19:30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 9, title: 'useContext для глобального состояния', duration: '17:50', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        ]
      }
    ]
  };

  const allLessons = course.modules.flatMap(m => m.lessons);
  const currentLesson = allLessons.find(l => l.id === currentLessonId);
  const progress = Math.round((completedLessons.length / allLessons.length) * 100);

  const handleMarkComplete = () => {
    if (!completedLessons.includes(currentLessonId)) {
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = (score: number) => {
    setQuizScores({ ...quizScores, [currentLessonId]: score });
    
    if (score >= 70) {
      setCompletedLessons([...completedLessons, currentLessonId]);
      toast.success('Урок успешно завершён!');
      
      const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
      if (currentIndex < allLessons.length - 1) {
        setTimeout(() => {
          setShowQuiz(false);
          setCurrentLessonId(allLessons[currentIndex + 1].id);
        }, 1000);
      } else {
        setShowQuiz(false);
      }
    } else {
      setShowQuiz(false);
    }
  };

  const handleSaveNote = () => {
    toast.success('Заметка сохранена!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground line-clamp-1">{course.title}</h1>
                <p className="text-sm text-muted-foreground">Модуль {course.modules[0].id} • Урок {currentLessonId}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Прогресс:</span>
                <div className="w-32">
                  <Progress value={progress} className="h-2" />
                </div>
                <span className="text-sm font-semibold text-primary">{progress}%</span>
              </div>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {showQuiz ? (
              <Quiz lessonId={currentLessonId} onComplete={handleQuizComplete} />
            ) : (
              <Card className="overflow-hidden border-2 animate-fade-in">
                <div className="relative bg-black aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={currentLesson?.videoUrl}
                    title={currentLesson?.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
                      </Button>
                      <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                        {currentLesson?.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {!showQuiz && (
              <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{currentLesson?.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={16} />
                          <span>{currentLesson?.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Eye" size={16} />
                          <span>1,234 просмотров</span>
                        </div>
                        {quizScores[currentLessonId] && (
                          <div className="flex items-center gap-1">
                            <Icon name="Trophy" size={16} className="text-yellow-500" />
                            <span className="font-semibold text-yellow-600">{quizScores[currentLessonId]}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={handleMarkComplete}
                      variant={completedLessons.includes(currentLessonId) ? "secondary" : "default"}
                      className="ml-4"
                      disabled={completedLessons.includes(currentLessonId)}
                    >
                      <Icon 
                        name={completedLessons.includes(currentLessonId) ? "CheckCircle2" : "Brain"} 
                        size={18} 
                        className="mr-2" 
                      />
                      {completedLessons.includes(currentLessonId) ? 'Завершено' : 'Пройти тест'}
                    </Button>
                  </div>
                </CardHeader>
              <CardContent>
                <Tabs defaultValue="description" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="description">Описание</TabsTrigger>
                    <TabsTrigger value="notes">Заметки</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="space-y-4">
                    <div className="prose max-w-none">
                      <p className="text-muted-foreground leading-relaxed">
                        В этом уроке мы рассмотрим основные концепции и принципы работы. 
                        Вы научитесь применять полученные знания на практике и создавать эффективные решения.
                      </p>
                      <h3 className="text-lg font-semibold mt-6 mb-3">Что вы узнаете:</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>Основные концепции и принципы работы</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>Практические примеры применения</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>Лучшие практики и распространённые ошибки</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border-t pt-4 mt-6">
                      <div className="flex items-center gap-4">
                        <img 
                          src={course.instructorAvatar} 
                          alt={course.instructor}
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-foreground">Преподаватель</p>
                          <p className="text-lg font-bold text-primary">{course.instructor}</p>
                          <p className="text-sm text-muted-foreground">Senior Web Developer</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="notes" className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Ваши заметки к уроку</label>
                      <Textarea
                        placeholder="Добавьте свои заметки..."
                        value={notes[currentLessonId] || ''}
                        onChange={(e) => setNotes({ ...notes, [currentLessonId]: e.target.value })}
                        className="min-h-[200px] border-2"
                      />
                      <Button onClick={handleSaveNote} className="mt-4">
                        <Icon name="Save" size={18} className="mr-2" />
                        Сохранить заметку
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            )}

          <div className="space-y-6">
            <Card className="animate-fade-in sticky top-24" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="List" size={24} className="text-primary" />
                  Содержание курса
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                  <span>{allLessons.length} уроков</span>
                  <span>•</span>
                  <span>{completedLessons.length} завершено</span>
                </div>
                <Progress value={progress} className="h-2 mt-4" />
              </CardHeader>
              <CardContent className="max-h-[600px] overflow-y-auto">
                <Accordion type="single" collapsible defaultValue="module-1" className="space-y-2">
                  {course.modules.map((module) => (
                    <AccordionItem key={module.id} value={`module-${module.id}`} className="border rounded-lg px-2">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-primary">{module.id}</span>
                          </div>
                          <span className="font-semibold">{module.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 pt-2">
                          {module.lessons.map((lesson) => (
                            <button
                              key={lesson.id}
                              onClick={() => setCurrentLessonId(lesson.id)}
                              className={`w-full text-left p-3 rounded-lg transition-all hover:bg-accent/50 ${
                                currentLessonId === lesson.id ? 'bg-primary/10 border-2 border-primary' : 'border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex-shrink-0">
                                  {completedLessons.includes(lesson.id) ? (
                                    <Icon name="CheckCircle2" size={20} className="text-primary" />
                                  ) : (
                                    <Icon name="Circle" size={20} className="text-muted-foreground" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm font-medium truncate ${
                                    currentLessonId === lesson.id ? 'text-primary' : 'text-foreground'
                                  }`}>
                                    {lesson.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                                </div>
                                {currentLessonId === lesson.id && (
                                  <Icon name="Play" size={16} className="text-primary flex-shrink-0" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} className="text-secondary" />
                  Ваш прогресс
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <div className="text-5xl font-bold text-primary mb-2">{progress}%</div>
                  <p className="text-sm text-muted-foreground">
                    {completedLessons.length} из {allLessons.length} уроков завершено
                  </p>
                </div>
                
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="Trophy" size={16} className="text-yellow-500" />
                      <span className="text-muted-foreground">Достижения</span>
                    </div>
                    <Badge variant="secondary">2/10</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" size={16} className="text-blue-500" />
                      <span className="text-muted-foreground">Дней обучения</span>
                    </div>
                    <Badge variant="secondary">5</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="Zap" size={16} className="text-orange-500" />
                      <span className="text-muted-foreground">Серия дней</span>
                    </div>
                    <Badge variant="secondary">3 🔥</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
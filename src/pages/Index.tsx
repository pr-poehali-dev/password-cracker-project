import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: 'Основы программирования на Python',
      description: 'Изучите Python с нуля: от переменных до объектно-ориентированного программирования',
      category: 'Программирование',
      level: 'Начинающий',
      duration: '8 недель',
      lessons: 24,
      progress: 0,
      students: 12543,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'Веб-разработка: React и TypeScript',
      description: 'Создавайте современные веб-приложения с React, TypeScript и лучшими практиками',
      category: 'Веб-разработка',
      level: 'Средний',
      duration: '10 недель',
      lessons: 32,
      progress: 45,
      students: 8921,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Дизайн интерфейсов: от теории к практике',
      description: 'Научитесь создавать красивые и функциональные пользовательские интерфейсы',
      category: 'Дизайн',
      level: 'Начинающий',
      duration: '6 недель',
      lessons: 18,
      progress: 0,
      students: 15230,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop'
    },
    {
      id: 4,
      title: 'Машинное обучение и анализ данных',
      description: 'Погрузитесь в мир ML: алгоритмы, нейронные сети и практические проекты',
      category: 'Data Science',
      level: 'Продвинутый',
      duration: '12 недель',
      lessons: 40,
      progress: 20,
      students: 6789,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop'
    },
    {
      id: 5,
      title: 'Цифровой маркетинг 2024',
      description: 'Освойте современные инструменты продвижения: SMM, SEO, контент-маркетинг',
      category: 'Маркетинг',
      level: 'Начинающий',
      duration: '7 недель',
      lessons: 21,
      progress: 0,
      students: 10456,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
    },
    {
      id: 6,
      title: 'Мобильная разработка на Flutter',
      description: 'Создавайте кроссплатформенные мобильные приложения для iOS и Android',
      category: 'Мобильная разработка',
      level: 'Средний',
      duration: '9 недель',
      lessons: 28,
      progress: 70,
      students: 5432,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop'
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const myCourses = courses.filter(c => c.progress > 0);
  const allCourses = courses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                EduPlatform
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Главная</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Курсы</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Прогресс</a>
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={20} />
              </Button>
            </div>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold mb-2 text-foreground">
            Добро пожаловать в обучение! 👋
          </h2>
          <p className="text-muted-foreground text-lg">
            Выберите курс и начните свой путь к новым знаниям
          </p>
        </div>

        <div className="mb-8 relative animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Поиск по курсам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-lg border-2 focus:border-primary transition-all"
          />
        </div>

        {myCourses.length > 0 && (
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="BookOpen" size={28} className="text-primary" />
              Мои курсы
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.map((course) => (
                <Card 
                  key={course.id} 
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <Badge className="absolute top-4 right-4 bg-primary">{course.category}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="text-muted-foreground">Прогресс</span>
                          <span className="font-semibold text-primary">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="PlayCircle" size={16} />
                          <span>{course.lessons} уроков</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={16} />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3 h-12">
              <TabsTrigger value="all" className="text-base">Все курсы</TabsTrigger>
              <TabsTrigger value="popular" className="text-base">Популярные</TabsTrigger>
              <TabsTrigger value="new" className="text-base">Новые</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course, idx) => (
                  <Card 
                    key={course.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary animate-scale-in"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                    onClick={() => navigate(`/course/${course.id}`)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <Badge className="absolute top-4 right-4 bg-primary">{course.category}</Badge>
                      {course.progress === 0 && (
                        <Badge className="absolute top-4 left-4 bg-secondary">Новый</Badge>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <CardTitle className="line-clamp-2 flex-1">{course.title}</CardTitle>
                      </div>
                      <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <Badge variant="secondary">{course.level}</Badge>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Icon name="Star" size={16} className="fill-current" />
                            <span className="font-semibold">{course.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Icon name="PlayCircle" size={16} />
                            <span>{course.lessons} уроков</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Users" size={16} />
                            <span>{course.students.toLocaleString()}</span>
                          </div>
                        </div>
                        <Button className="w-full" size="lg">
                          <Icon name="Play" size={18} className="mr-2" />
                          {course.progress > 0 ? 'Продолжить' : 'Начать курс'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="popular">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...filteredCourses].sort((a, b) => b.students - a.students).map((course) => (
                  <Card 
                    key={course.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary"
                    onClick={() => navigate(`/course/${course.id}`)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-4 right-4 bg-primary">{course.category}</Badge>
                      <Badge className="absolute top-4 left-4 bg-accent">🔥 Популярный</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <Badge variant="secondary">{course.level}</Badge>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Icon name="Star" size={16} className="fill-current" />
                            <span className="font-semibold">{course.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Icon name="PlayCircle" size={16} />
                            <span>{course.lessons} уроков</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Users" size={16} />
                            <span>{course.students.toLocaleString()}</span>
                          </div>
                        </div>
                        <Button className="w-full" size="lg">
                          <Icon name="Play" size={18} className="mr-2" />
                          {course.progress > 0 ? 'Продолжить' : 'Начать курс'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.filter(c => c.progress === 0).map((course) => (
                  <Card 
                    key={course.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary"
                    onClick={() => navigate(`/course/${course.id}`)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-4 right-4 bg-primary">{course.category}</Badge>
                      <Badge className="absolute top-4 left-4 bg-secondary">✨ Новый</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <Badge variant="secondary">{course.level}</Badge>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Icon name="Star" size={16} className="fill-current" />
                            <span className="font-semibold">{course.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Icon name="PlayCircle" size={16} />
                            <span>{course.lessons} уроков</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Users" size={16} />
                            <span>{course.students.toLocaleString()}</span>
                          </div>
                        </div>
                        <Button className="w-full" size="lg">
                          <Icon name="Play" size={18} className="mr-2" />
                          Начать курс
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;

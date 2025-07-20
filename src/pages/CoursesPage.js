import { useState, useEffect, useLayoutEffect, useRef } from "react";
import CourseCard from "../components/common/CourseCard";
import CourseCardSkeleton from "../components/common/CourseCardSkeleton";
import codeblazeLogo from "../assets/images/codeblazelogoorange.png";
import introToAi from "../assets/images/courses/introduction-to-ai.png";
import introToMl from "../assets/images/courses/introduction-to-ml.png";
import java from "../assets/images/courses/java.png";
import mongoDb from "../assets/images/courses/mongo-db.png";
import nodeJsExpress from "../assets/images/courses/node-js-express.png";
import reactJs from "../assets/images/courses/react-js.png";
import aws from "../assets/images/courses/aws.png";
import docker from "../assets/images/courses/docker.png";
import kubernetes from "../assets/images/courses/kubernetes.png";
import postgresql from "../assets/images/courses/postgre-sql.png";
import python from "../assets/images/courses/python.png";
import redis from "../assets/images/courses/redis.png";
import angular from "../assets/images/courses/angular.png";
import apachekafka from "../assets/images/courses/apachekafka.png";
import celery from "../assets/images/courses/celery.png";
import django from "../assets/images/courses/django.png";
import graphql from "../assets/images/courses/graphql.png";
import jenkins from "../assets/images/courses/jenkins.png";
import mysql from "../assets/images/courses/mysql.png";
import numpy from "../assets/images/courses/numpy.png";
import pandas from "../assets/images/courses/pandas.png";
import springboot from "../assets/images/courses/springboot.png";

export const allCourses = [
  {
    id: "postgresql-mastery",
    title: "PostgreSQL Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: postgresql,
    rating: 4.8,
    reviewCount: 12345,
    level: "Intermediate",
    duration: "1-3 Months",
    type: "Course",
    category: "Backend",
    tag: "Bestseller",
    price: 499,
  },
  {
    id: "redis-mastery",
    title: "Redis Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: redis,
    rating: 4.7,
    reviewCount: 1234,
    level: "Intermediate",
    duration: "1-3 Months",
    type: "Course",
    category: "Backend",
    price: 399,
  },
  {
    id: "docker-mastery",
    title: "Docker Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: docker,
    rating: 4.9,
    reviewCount: 54321,
    level: "Beginner",
    duration: "1-3 Months",
    type: "Course",
    category: "Cloud Computing",
    tag: "Premium",
    price: 599,
  },
  {
    id: "kubernetes-mastery",
    title: "Kubernetes Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: kubernetes,
    rating: 4.8,
    reviewCount: 43210,
    level: "Intermediate",
    duration: "3-6 Months",
    type: "Course",
    category: "Cloud Computing",
    price: 599,
  },
  {
    id: "aws-mastery",
    title: "AWS Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: aws,
    rating: 4.9,
    reviewCount: 98765,
    level: "Intermediate",
    duration: "3-6 Months",
    type: "Course",
    category: "Cloud Computing",
    price: 599,
  },
  {
    id: "graphql-mastery",
    title: "GraphQL Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: graphql,
    rating: 4.7,
    reviewCount: 13579,
    level: "Intermediate",
    duration: "1-3 Months",
    type: "Course",
    category: "Backend",
    price: 499,
  },
  {
    id: "python-mastery",
    title: "Python Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: python,
    rating: 4.9,
    reviewCount: 123456,
    level: "Beginner",
    duration: "1-3 Months",
    type: "Course",
    category: "Backend",
    tag: "Bestseller",
    price: 499,
  },
  {
    id: "django-mastery",
    title: "Django Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: django,
    rating: 4.8,
    reviewCount: 65432,
    level: "Intermediate",
    duration: "3-6 Months",
    type: "Course",
    category: "Backend",
    price: 499,
  },
  {
    id: "celery-mastery",
    title: "Celery Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: celery,
    rating: 4.7,
    reviewCount: 9876,
    level: "Intermediate",
    duration: "1-3 Months",
    type: "Course",
    category: "Backend",
    price: 399,
  },
  {
    id: "pandas-mastery",
    title: "Pandas Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: pandas,
    rating: 4.9,
    reviewCount: 24680,
    level: "Intermediate",
    duration: "1-3 Months",
    type: "Course",
    category: "Data Science",
    price: 399,
  },
  {
    id: "numpy-mastery",
    title: "Numpy Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: numpy,
    rating: 4.9,
    reviewCount: 13579,
    level: "Intermediate",
    duration: "1-3 Months",
    type: "Course",
    category: "Data Science",
    price: 399,
  },
  {
    id: "java-mastery",
    title: "Java Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: java,
    rating: 4.8,
    reviewCount: 111111,
    level: "Beginner",
    duration: "3-6 Months",
    type: "Course",
    category: "Backend",
    tag: "Premium",
    price: 599,
  },
  {
    id: "spring-boot-mastery",
    title: "Spring Boot Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: springboot,
    rating: 4.8,
    reviewCount: 99999,
    level: "Intermediate",
    duration: "3-6 Months",
    type: "Course",
    category: "Backend",
    price: 599,
  },
  {
    id: "angular-mastery",
    title: "Angular Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: angular,
    rating: 4.7,
    reviewCount: 88888,
    level: "Intermediate",
    duration: "3-6 Months",
    type: "Course",
    category: "Frontend",
    price: 499,
  },
  {
    id: "mysql-mastery",
    title: "MySQL Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: mysql,
    rating: 4.8,
    reviewCount: 77777,
    level: "Beginner",
    duration: "1-3 Months",
    type: "Course",
    category: "Backend",
    price: 399,
  },
  {
    id: "apache-kafka-mastery",
    title: "Apache Kafka Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: apachekafka,
    rating: 4.7,
    reviewCount: 66666,
    level: "Intermediate",
    duration: "3-6 Months",
    type: "Course",
    category: "Backend",
    price: 599,
  },
  {
    id: "jenkins-mastery",
    title: "Jenkins Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: jenkins,
    rating: 4.8,
    reviewCount: 55555,
    level: "Intermediate",
    duration: "1-3 Months",
    type: "Course",
    category: "Cloud Computing",
    price: 499,
  },
  {
    id: "mongodb-mastery",
    title: "MongoDB Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: mongoDb,
    rating: 4.8,
    reviewCount: 44444,
    level: "Beginner",
    duration: "1-3 Months",
    type: "Course",
    category: "Backend",
    price: 399,
  },
  {
    id: "nodejs-express-mastery",
    title: "Node.js & Express Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: nodeJsExpress,
    rating: 4.9,
    reviewCount: 33333,
    level: "Intermediate",
    duration: "3-6 Months",
    type: "Course",
    category: "Backend",
    price: 499,
  },
  {
    id: "react-js-mastery",
    title: "React.js Mastery",
    provider: "Codeblaze Academy",
    providerLogo: codeblazeLogo,
    image: reactJs,
    rating: 4.9,
    reviewCount: 22222,
    level: "Beginner",
    duration: "3-6 Months",
    type: "Course",
    category: "Frontend",
    price: 499,
  },
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [level, setLevel] = useState("All");
  const [type, setType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [visibleCourses, setVisibleCourses] = useState(12);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleViewMore = () => {
    scrollPositionRef.current = window.pageYOffset;
    setLoading(true);
    setTimeout(() => {
      setVisibleCourses(allCourses.length);
      setLoading(false);
    }, 1000);
  };

  useLayoutEffect(() => {
    if (!loading) {
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, [loading]);

  const filteredCourses = allCourses.filter((course) => {
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (level === "All" || course.level === level) &&
      (type === "All" || course.type === type)
    );
  });

  return (
    <div className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-gray-900 mb-8">All Courses</h2>
        <div className="flex justify-between mb-8">
          <input
            type="text"
            placeholder="Search for courses..."
            className="w-1/2 p-2 border border-gray-300 rounded-md"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-4">
            <select
              className="p-2 border border-gray-300 rounded-md"
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <select
              className="p-2 border border-gray-300 rounded-md"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Course">Course</option>
              <option value="Specialization">Specialization</option>
              <option value="Professional Certificate">
                Professional Certificate
              </option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseCardSkeleton key={index} />
              ))
            : filteredCourses
                .slice(0, visibleCourses)
                .map((course) => <CourseCard key={course.id} course={course} />)}
        </div>
        {visibleCourses < filteredCourses.length && !loading && (
          <div className="text-center mt-8">
            <button
              onClick={handleViewMore}
              className="bg-primary text-white px-8 py-2 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


import {
  GraduationCap,
  Target,
  Heart,
  Users,
  BookOpen,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To make quality education accessible to everyone through practical, affordable, and engaging online learning experiences.",
  },
  {
    icon: Lightbulb,
    title: "Our Vision",
    description:
      "To empower learners with the knowledge and skills they need to achieve their goals and build a better future.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "We believe in accessible education, continuous growth, practical learning, and supporting every learner's journey.",
  },
];

const features = [
  "Expert-led courses",
  "Learn at your own pace",
  "Track your learning progress",
  "Practical skills for real-world goals",
];

export default function About() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="badge badge-outline badge-primary mb-6 gap-2 px-4 py-3">
              <GraduationCap className="h-4 w-4" />
              About CourseMaster
            </div>

            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Learn Today.
              <span className="block text-primary">
                Lead Tomorrow.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base-content/70 sm:text-lg">
              We believe learning should open doors, build confidence, and
              create opportunities. CourseMaster helps you develop your
              knowledge and move closer to your goals.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/courses" className="btn btn-primary gap-2">
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link to="/register" className="btn btn-outline">
                Join Our Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Who We Are
            </span>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Education that moves you forward
            </h2>

            <p className="mt-6 leading-7 text-base-content/70">
              CourseMaster is an online learning platform designed to help
              students explore new subjects, strengthen their skills, and
              continue learning at their own pace.
            </p>

            <p className="mt-4 leading-7 text-base-content/70">
              Whether you're starting your learning journey or expanding
              your existing knowledge, our goal is to make learning easier
              to access, understand, and put into practice.
            </p>

            <div className="mt-7 space-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium sm:text-base">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/10 to-secondary/10 p-6 sm:p-10">
              <div className="rounded-2xl border border-base-300/70 bg-base-100 p-6 shadow-xl sm:p-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-lg">
                  <GraduationCap className="h-9 w-9" />
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  Your learning journey starts here
                </h3>

                <p className="mt-3 leading-7 text-base-content/70">
                  Discover courses, learn new concepts, complete lessons,
                  and monitor your progress through your personal dashboard.
                </p>

                <div className="mt-6 flex items-center gap-3 rounded-xl bg-base-200/70 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold">Keep Growing</p>
                    <p className="text-sm text-base-content/60">
                      One lesson at a time
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-2 hidden rounded-2xl border border-base-300 bg-base-100 p-4 shadow-lg sm:block sm:-right-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold">Never Stop Learning</p>
                  <p className="text-xs text-base-content/60">
                    Build your future
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, vision, values */}
      <section className="bg-base-200/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              What Drives Us
            </span>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Learning with a purpose
            </h2>

            <p className="mt-4 text-base-content/70">
              Everything we do is guided by our commitment to meaningful
              learning and personal growth.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="card border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="card-body p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-3 text-xl font-bold">{title}</h3>

                  <p className="leading-7 text-base-content/70">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Learning experience */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-secondary p-8 text-primary-content sm:p-12 lg:p-16">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold opacity-90">
                <Users className="h-5 w-5" />
                Start Your Journey
              </div>

              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                Your next opportunity begins with learning.
              </h2>

              <p className="mt-4 max-w-2xl leading-7 opacity-90">
                Take the next step toward your goals. Explore our available
                courses and discover what you can achieve with CourseMaster.
              </p>
            </div>

            <Link
              to="/courses"
              className="btn border-0 bg-base-100 text-primary hover:bg-base-200"
            >
              Browse Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

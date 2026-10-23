import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, setPage } from "../../../store/slices/coursesSlice";
import { deleteCourseAsync, clearSuccess } from "../../../store/slices/adminSlice";
import { Link } from "react-router-dom";

// Helper function to calculate syllabus statistics
const getSyllabusStats = (course) => {
    if (!course.syllabus || course.syllabus.length === 0) {
        return { modules: 0, lessons: 0, quizzes: 0, assignments: 0 };
    }

    let lessons = 0;
    let quizzes = 0;
    let assignments = 0;

    course.syllabus.forEach((module) => {
        if (module.lessons && module.lessons.length > 0) {
            lessons += module.lessons.length;
            module.lessons.forEach((lesson) => {
                if (lesson.quiz && lesson.quiz.length > 0) {
                    quizzes += lesson.quiz.length;
                }
                if (lesson.assignmentPrompt) {
                    assignments += 1;
                }
            });
        }
    });

    return {
        modules: course.syllabus.length,
        lessons,
        quizzes,
        assignments,
    };
};

export default function ManageCourses() {
    const dispatch = useDispatch();
    const { courses, totalPages, page, loading } = useSelector((state) => state.courses);
    const { success, error } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchCourses({ page, limit: 10 }));
    }, [dispatch, page]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            dispatch(deleteCourseAsync(id));
        }
    };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                dispatch(clearSuccess());
                dispatch(fetchCourses({ page, limit: 10 }));
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [success, dispatch, page]);

    return (
      <div className="space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h1 className="page-heading">Manage Courses</h1>
          <Link
            to="/admin/courses/create"
            className="btn btn-primary btn-sm sm:btn-md w-full sm:w-auto"
          >
            + New Course
          </Link>
        </div>

        {success && (
          <div className="alert alert-success">
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner"></span>
          </div>
        ) : courses.length === 0 ? (
          <div className="alert">No courses found</div>
        ) : (
          <>
            {/* Table for md+ */}
            <div className="hidden overflow-x-auto rounded-xl border border-base-300 bg-base-100 shadow-sm md:block">
              <table className="table w-full min-w-[850px]">
                <thead>
                  <tr className="bg-base-200/70 text-xs font-semibold uppercase tracking-wide text-base-content/60">
                    <th className="px-4 py-4">Title</th>
                    <th className="px-4 py-4">Instructor</th>
                    <th className="px-4 py-4">Price</th>
                    <th className="px-4 py-4">Category</th>
                    <th className="px-4 py-4">Syllabus</th>
                    <th className="px-4 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {courses.map((course) => {
                    const stats = getSyllabusStats(course);

                    return (
                      <tr
                        key={course._id}
                        className="border-b border-base-200 transition-colors last:border-b-0 hover:bg-base-200/30"
                      >
                        {/* Title */}
                        <td className="max-w-64 px-4 py-5">
                          <p
                            className="truncate font-semibold text-base-content"
                            title={course.title}
                          >
                            {course.title}
                          </p>
                        </td>

                        {/* Instructor */}
                        <td className="px-4 py-5">
                          <div className="flex min-w-32 items-center gap-2">
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                              {course.instructorName?.charAt(0).toUpperCase() ||
                                "I"}
                            </div>

                            <span className="text-sm leading-5 text-base-content/80">
                              {course.instructorName || "—"}
                            </span>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="whitespace-nowrap px-4 py-5">
                          <span className="font-semibold text-base-content">
                            ৳{Number(course.price || 0).toLocaleString("en-BD")}
                          </span>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-5">
                          {course.category ? (
                            <span className="inline-flex max-w-36 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                              {course.category}
                            </span>
                          ) : (
                            <span className="text-base-content/40">—</span>
                          )}
                        </td>

                        {/* Syllabus */}
                        <td className="min-w-48 px-4 py-5">
                          {stats.modules === 0 ? (
                            <span className="inline-flex items-center rounded-md bg-base-200 px-2.5 py-1.5 text-xs text-base-content/60">
                              No syllabus
                            </span>
                          ) : (
                            <div className="flex flex-col gap-1.5 text-xs">
                              <div className="flex items-center gap-2 text-base-content/80">
                                <i className="bx bx-collection text-base text-primary" />
                                <span>
                                  {stats.modules} Module
                                  {stats.modules !== 1 ? "s" : ""}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-base-content/80">
                                <i className="bx bx-book-open text-base text-primary" />
                                <span>
                                  {stats.lessons} Lesson
                                  {stats.lessons !== 1 ? "s" : ""}
                                </span>
                              </div>

                              {(stats.quizzes > 0 || stats.assignments > 0) && (
                                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                                  {stats.quizzes > 0 && (
                                    <span className="inline-flex items-center gap-1 text-info">
                                      <i className="bx bx-help-circle text-sm" />
                                      {stats.quizzes} Quiz
                                      {stats.quizzes !== 1 ? "zes" : ""}
                                    </span>
                                  )}

                                  {stats.assignments > 0 && (
                                    <span className="inline-flex items-center gap-1 text-secondary">
                                      <i className="bx bx-task text-sm" />
                                      {stats.assignments} Assignment
                                      {stats.assignments !== 1 ? "s" : ""}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-5">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              to={`/admin/courses/edit/${course._id}`}
                              className="btn btn-sm btn-warning min-w-16 rounded-lg"
                            >
                              <i className="bx bx-edit-alt text-base" />
                              Edit
                            </Link>

                            <button
                              onClick={() => handleDelete(course._id)}
                              className="btn btn-sm btn-error min-w-20 rounded-lg"
                            >
                              <i className="bx bx-trash text-base" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Cards for small screens */}
            <div className="md:hidden space-y-3">
              {courses.map((course) => {
                const stats = getSyllabusStats(course);
                return (
                  <div
                    key={course._id}
                    className="card bg-base-100 shadow-sm border border-base-200"
                  >
                    <div className="card-body p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-base sm:text-lg break-words">
                            {course.title}
                          </div>
                          <div className="text-xs sm:text-sm text-base-content/70 mt-1">
                            {course.instructorName}
                          </div>
                          <div className="text-xs sm:text-sm text-base-content/70">
                            {course.category || "-"}
                          </div>

                          {/* Syllabus Stats */}
                          {stats.modules > 0 && (
                            <div className="mt-3 p-2 bg-base-200 rounded text-xs space-y-1">
                              <div className="font-semibold">Syllabus:</div>
                              <div>
                                📚 {stats.modules} Module
                                {stats.modules !== 1 ? "s" : ""} • 📖{" "}
                                {stats.lessons} Lesson
                                {stats.lessons !== 1 ? "s" : ""}
                              </div>
                              {(stats.quizzes > 0 || stats.assignments > 0) && (
                                <div className="flex flex-wrap gap-2">
                                  {stats.quizzes > 0 && (
                                    <span className="text-primary">
                                      ❓ {stats.quizzes} Quiz
                                      {stats.quizzes !== 1 ? "zes" : ""}
                                    </span>
                                  )}
                                  {stats.assignments > 0 && (
                                    <span className="text-secondary">
                                      📝 {stats.assignments} Assignment
                                      {stats.assignments !== 1 ? "s" : ""}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                          {stats.modules === 0 && (
                            <div className="mt-2 text-xs text-base-content/50">
                              No syllabus added
                            </div>
                          )}
                        </div>
                        <div className="flex sm:flex-col sm:text-right sm:ml-3 justify-between sm:justify-start items-center sm:items-end gap-2">
                          <div className="text-base sm:text-lg font-bold">
                            ৳{course.price}
                          </div>
                          <div className="flex sm:flex-col gap-2">
                            <Link
                              to={`/admin/courses/edit/${course._id}`}
                              className="btn btn-xs btn-warning"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(course._id)}
                              className="btn btn-xs btn-error"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => dispatch(setPage(pageNum))}
                      className={`btn btn-sm ${page === pageNum ? "btn-primary" : "btn-outline"}`}
                    >
                      {pageNum}
                    </button>
                  ),
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
}

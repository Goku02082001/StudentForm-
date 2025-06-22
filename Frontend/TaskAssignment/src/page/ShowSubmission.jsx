import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Paperclip,
  Calendar,
  User,
  FileText,
} from 'lucide-react';

const SubmissionCards = ({ submissions = [], loading, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const totalPages = Math.ceil(submissions.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentSubmissions = submissions.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading submissions...
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Student Submissions
      </h1>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentSubmissions.map((submission) => (
          <div
            key={submission._id}
            className="group relative bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white border border-white/20 transform transition-all duration-300 hover:scale-105 hover:rotate-1 hover:shadow-2xl hover:shadow-purple-500/25 hover:bg-white/15 cursor-pointer"
            style={{
              perspective: '1000px',
            }}
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-purple-200">
                    {submission.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-300 mb-2">
                    <FileText className="w-4 h-4 mr-1" />
                    Assignment
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-300 mb-4">{submission.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <User className="w-4 h-4 mr-2 text-blue-300" />
                  <span className="font-medium">{submission.studentName}</span>
                  <span className="text-gray-400 ml-auto">{submission.studentId}</span>
                </div>

                <div className="flex items-center text-sm text-gray-300">
                  <Calendar className="w-4 h-4 mr-2 text-green-300" />
                  {formatDate(submission.submittedAt)}
                </div>
              </div>

              {submission.attachment && (
                <div className="pt-3 border-t border-white/20">
                  <a
                    href={submission.attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    <Paperclip className="w-4 h-4 mr-1" />
                    View Attachment
                  </a>
                </div>
              )}
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:via-blue-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    currentPage === page
                      ? 'bg-purple-500 text-white border-purple-500'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}

      <div className="text-center mt-4 text-gray-300 text-sm">
        Showing {startIndex + 1} to{' '}
        {Math.min(startIndex + cardsPerPage, submissions.length)} of{' '}
        {submissions.length} submissions
      </div>
    </div>
  );
};

export default SubmissionCards;

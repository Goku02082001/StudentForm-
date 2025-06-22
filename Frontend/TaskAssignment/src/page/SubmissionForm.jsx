import { useState } from 'react';

export default function AssignmentSubmissionForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    studentName: '',
    studentId: '',
    attachment: null
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setFormData(prev => ({
        ...prev,
        attachment: file
      }));
    } else {
      setMessage({ type: 'error', text: 'Please upload only PDF or image files' });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        setFormData(prev => ({
          ...prev,
          attachment: file
        }));
      } else {
        setMessage({ type: 'error', text: 'Please upload only PDF or image files' });
      }
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setMessage({ type: '', text: '' });

  try {
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('studentName', formData.studentName);
    formDataToSend.append('studentId', formData.studentId);
    if (formData.attachment) {
      formDataToSend.append('attachment', formData.attachment);
    }

    const response = await fetch('https://studentform-m78a.onrender.com/api/submissions', {
      method: 'POST',
      body: formDataToSend
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit assignment');
    }

    setMessage({ type: 'success', text: '🎉 Assignment submitted successfully!' });
    setFormData({
      title: '',
      description: '',
      studentName: '',
      studentId: '',
      attachment: null
    });
  } catch (error) {
    setMessage({ type: 'error', text: error.message });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="relative">
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
  </div>

   <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 py-8 px-4 flex justify-center items-center relative z-10">



      <div className="max-w-2xl w-full">
        
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl shadow-2xl mb-4">
            <span className="text-4xl">📝</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-2">
            Submit Assignment
          </h1>
          <p className="text-gray-400 text-lg">Upload your work and make it shine ✨</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden ">
          <div className="p-8">
            <div className="space-y-6">
              <div className="group">
                <label className="block text-white font-semibold mb-2 text-lg">
                  Assignment Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                  placeholder="Enter your assignment title..."
                />
              </div>

              <div className="group">
                <label className="block text-white font-semibold mb-2 text-lg">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 backdrop-blur-sm resize-none"
                  placeholder="Describe your assignment details..."
                />
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2 text-lg">
                    Student Name
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2 text-lg">
                    Student ID
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                    placeholder="Your student ID"
                  />
                </div>
              </div>

              
              <div>
                <label className="block text-white font-semibold mb-2 text-lg">
                  Attachment
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer group ${
                    dragActive
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-white/30 hover:border-purple-500/50 hover:bg-white/5'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">📎</span>
                    </div>
                    {formData.attachment ? (
                      <div>
                        <p className="text-white font-semibold mb-1">{formData.attachment.name}</p>
                        <p className="text-gray-400 text-sm">Click or drag to replace</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-white font-semibold mb-1">Drop your file here or click to browse</p>
                        <p className="text-gray-400 text-sm">PDF or images only</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {message.text && (
                <div className={`p-4 rounded-2xl backdrop-blur-sm border ${
                  message.type === 'success' 
                    ? 'bg-green-500/20 border-green-500/50 text-green-200' 
                    : 'bg-red-500/20 border-red-500/50 text-red-200'
                }`}>
                  {message.text}
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-purple-500/25"
              >
                <div className="flex items-center justify-center space-x-3">
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-lg">Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">🚀</span>
                      <span className="text-lg">Submit Assignment</span>
                    </>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
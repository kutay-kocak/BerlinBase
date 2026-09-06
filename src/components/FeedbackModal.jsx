import React, { useState } from 'react';
import { MessageSquare, X, Send, Heart, CheckCircle2 } from 'lucide-react';

export default function FeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    
    // Save to localStorage or mock dispatch
    const existing = JSON.parse(localStorage.getItem('berlinbase_feedback') || '[]');
    existing.push({
      feedback,
      email,
      date: new Date().toISOString()
    });
    localStorage.setItem('berlinbase_feedback', JSON.stringify(existing));

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFeedback('');
      setEmail('');
      setIsOpen(false);
    }, 2200);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 bg-bvg-yellow text-bvg-dark hover:bg-yellow-400 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 border-2 border-bvg-dark/20"
          title="Send Feedback to Creator"
        >
          <MessageSquare className="w-4 h-4 text-bvg-dark fill-bvg-dark/20" />
          <span>Feedback</span>
        </button>
      </div>

      {/* Center Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#1A1A24] border border-gray-200 dark:border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative transition-colors duration-300">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header & User's Custom Copy */}
            <div className="pr-8 mb-5">
              <div className="w-10 h-10 rounded-xl bg-bvg-yellow/20 border border-bvg-yellow/40 flex items-center justify-center text-bvg-yellow mb-3">
                <Heart className="w-5 h-5 fill-bvg-yellow text-bvg-yellow" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-snug">
                Hi, I would like to hear your feedback and improve here towards your opinion :)
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                If you would like to reach me, you can write your e-mail at the end of the message.
              </p>
            </div>

            {/* Submission State */}
            {submitted ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 animate-bounce" />
                <h4 className="font-bold text-base text-gray-900 dark:text-white">Vielen Dank! Thank you!</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 max-w-xs">
                  Your feedback has been noted. We are building BerlinBase together!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <textarea
                    required
                    rows="4"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Write your thoughts, ideas, or things you would like to see in BerlinBase..."
                    className="w-full text-sm p-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-[#23242E] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-bvg-yellow focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Optional: your email if you want a response"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-gray-50 dark:bg-[#23242E] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-bvg-yellow focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center space-x-2 bg-bvg-yellow hover:bg-yellow-400 text-bvg-dark font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Send Feedback</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
}

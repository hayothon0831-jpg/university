import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, BookOpen, Send, Megaphone, ExternalLink } from 'lucide-react';

interface StudySession {
  id: string;
  subject: string;
  time: string;
  location: string;
  createdAt: number;
}

export default function App() {
  const [sessions, setSessions] = useState<StudySession[]>(() => {
    const saved = localStorage.getItem('snapstudy_sessions');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: '1',
        subject: 'Data Structures & Algorithms',
        time: 'Today, 4:00 PM',
        location: 'Library Level 4',
        createdAt: Date.now() - 3600000,
      },
      {
        id: '2',
        subject: 'Linear Algebra Review',
        time: 'Tomorrow, 10:00 AM',
        location: 'https://zoom.us/j/123456789',
        createdAt: Date.now() - 7200000,
      },
    ];
  });

  const [isHost, setIsHost] = useState(true);
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  // Persist sessions to localStorage
  React.useEffect(() => {
    localStorage.setItem('snapstudy_sessions', JSON.stringify(sessions));
  }, [sessions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !time || !location) return;

    const newSession: StudySession = {
      id: Math.random().toString(36).substr(2, 9),
      subject,
      time,
      location,
      createdAt: Date.now(),
    };

    setSessions([newSession, ...sessions]);
    setSubject('');
    setTime('');
    setLocation('');
  };

  const isLink = (str: string) => str.toLowerCase().includes('http');

  return (
    <div className="min-h-screen pb-20">
      {/* Campus Updates Banner */}
      <div className="bg-lime text-maroon py-2 px-4 text-center font-semibold text-sm sticky top-0 z-[60] flex items-center justify-center gap-2">
        <Megaphone className="w-4 h-4" />
        <span>Campus Update: Exam preparation workshops now available in the Student Hub!</span>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-100 sticky top-[36px] z-50 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-maroon rounded-lg flex items-center justify-center">
            <BookOpen className="text-white w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-maroon tracking-tight">SnapStudy</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 font-medium text-maroon/70 mr-4">
            <a href="#" className="hover:text-maroon transition-colors">Find Sessions</a>
            <a href="#" className="hover:text-maroon transition-colors">About</a>
          </div>
          
          {/* Role Toggle Switch */}
          <div className="flex items-center bg-offwhite p-1 rounded-full border border-gray-200">
            <button 
              onClick={() => setIsHost(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${isHost ? 'bg-maroon text-white shadow-sm' : 'text-maroon/40 hover:text-maroon'}`}
            >
              Host
            </button>
            <button 
              onClick={() => setIsHost(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${!isHost ? 'bg-maroon text-white shadow-sm' : 'text-maroon/40 hover:text-maroon'}`}
            >
              Guest
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-12">
        {/* Host a Session Section - Conditional rendering */}
        <AnimatePresence>
          {isHost && (
            <motion.section 
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 64 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-50 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center text-maroon">Host a Session</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-maroon/60 ml-2">Subject</label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Physics 101"
                        className="w-full px-5 py-3 rounded-2xl bg-offwhite border-none focus:ring-2 focus:ring-maroon/20 outline-none placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-maroon/60 ml-2">Time</label>
                      <input
                        type="text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="e.g. Sunday at 2PM"
                        className="w-full px-5 py-3 rounded-2xl bg-offwhite border-none focus:ring-2 focus:ring-maroon/20 outline-none placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-maroon/60 ml-2">Location or Link</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Library Rm 202 or Zoom Link"
                      className="w-full px-5 py-3 rounded-2xl bg-offwhite border-none focus:ring-2 focus:ring-maroon/20 outline-none placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-lime text-maroon font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-lime/20"
                  >
                    <Send className="w-5 h-5" />
                    Post Session
                  </button>
                </form>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Live Feed Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-maroon">Live Feed</h2>
              <p className="text-sm text-maroon/50 mt-1">Discover peer-led study sessions across campus.</p>
            </div>
            {!isHost && (
              <div className="bg-maroon/5 px-4 py-2 rounded-2xl flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-maroon">Guest View Active</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence initial={false}>
              {sessions.map((session) => (
                <motion.div
                  key={session.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-maroon/5 text-maroon text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Study Group
                      </span>
                      <span className="text-[10px] text-maroon/40 font-medium italic">
                        Just now
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-maroon leading-tight">{session.subject}</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-maroon/80">
                        <Clock className="w-4 h-4 text-maroon" />
                        <span className="text-sm font-medium">{session.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-maroon/80">
                        <MapPin className="w-4 h-4 text-maroon" />
                        <span className="text-sm font-medium truncate max-w-[200px]">
                          {isLink(session.location) ? 'Online Session' : session.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {isLink(session.location) ? (
                    <a
                      href={session.location.startsWith('http') ? session.location : `https://${session.location}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-lime text-maroon font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-lime/90 transition-colors shadow-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Join Zoom Instantly
                    </a>
                  ) : (
                    <div className="w-full bg-offwhite text-maroon/50 font-bold py-3 rounded-full flex items-center justify-center gap-2 cursor-default">
                      On Campus
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}

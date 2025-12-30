import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios"; // axios instance
import { User,  ArrowLeft, SearchX } from "lucide-react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // URL se 'q' parameter nikal rhe hai 
  const [results, setResults] = useState({ candidates: [], courses: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        // Backend API call
        const response = await api.get(`/search?q=${query}`); 
        setResults(response.data.results);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  if (loading) return <div className="p-10 text-center font-bold">Searching records...</div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-100">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
          Search Results for: <span className="text-indigo-600">"{query}"</span>
        </h1>
      </div>

      {results.totalFound === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
          <SearchX size={48} className="mb-4" />
          <p className="font-bold uppercase tracking-widest text-xs">Koi record nahi mila bhai!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Candidates Section */}
          <section>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <User size={14} /> Candidates ({results.candidates.length})
            </h2>
            <div className="space-y-3">
              {results.candidates.map(c => (
                <div key={c._id} onClick={() => navigate(`/candidates/${c._id}`)} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md cursor-pointer transition-all">
                  <p className="font-black text-slate-900">{c.fullName}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{c.emailAddress} • {c.status} • {c.courseApplied} </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
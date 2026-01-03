import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
   BookOpen, Users, Globe, Briefcase, 
  CheckCircle,  Award, ShieldCheck, 
  TrendingUp, MapPin,  GraduationCap,
  ClipboardList, MonitorPlay, Sparkles, FileBadge, Smartphone
} from 'lucide-react';

// Images Import
import logo from '../assets/logo 6.png';
import lab from '../assets/lab.png';
import targetImg from '../assets/target.png';
import training from '../assets/training.png';
import footerLogo from '../assets/footer.png';
import footerThumb from '../assets/footerr.png';
import intrologo from '../assets/logo 1.png'
import mission from '../assets/mission.png';


const MissionSection = () => {
  return (
    <section className="py-32 px-8 md:px-20 relative z-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-6xl font-black text-white uppercase leading-[0.9] tracking-tighter">
            Our Mission: <br /> <span className="text-teal-400 underline decoration-white/20">Empowering</span> <br /> the Community
          </h2>
          <div className="space-y-6 text-slate-600 text-xl leading-relaxed font-medium">
            <p>
              Asporea is committed to building a future-ready workforce by bridging the gap between local talent and global industry standards. 
            </p>
            <p className="border-l-4 border-teal-500 pl-6 italic text-white/90 bg-white/5 py-4 rounded-r-2xl">
              "To empower the community across 35 panchayats through structured skill training and guaranteed placement opportunities."
            </p>
            <p>
              By leveraging the Tenzing Norway Samiti network, we ensure that every candidate finds a pathway to professional success, whether nationally or globally.
            </p>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-teal-500/20 blur-[100px] rounded-full" />
          <div className="relative h-125 rounded-[4rem] border-12px border-white/5 overflow-hidden shadow-2xl">
             <img src={mission} alt="Mission" className="w-full h-full object-cover  hover:grayscale-0 transition-all duration-700" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

const IntroScreen = ({ onComplete }) => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
    >

      <div className="absolute bottom-[-10%] w-screen h-[50vh] bg-teal-500/20 blur-[150px] rounded-full" />
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center z-10 px-6"
      >
         <div className=" w-64 h-24 mx-auto  flex items-center justify-center ">
          <img 
            src={intrologo} 
            alt="Asporea" 
            className="w-full h-full object-contain p-4 mix-blend-multiply " 
          />
          
        </div>
        <p className='text-teal-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-2 opacity-90'>Human Resource Consultants Pvt.ltd</p>
        <h2 className="text-teal-400 font-black tracking-[0.3em] uppercase text-sm m-20">Presents</h2>
        <h1 className="text-white text-4xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-10">
          Empowering Careers & <br /> <span className="text-transparent  bg-clip-text bg-linear-to-r from-teal-400 to-indigo-500">
            Transforming Lives.
          </span>
        </h1>
        <p className=" text-slate-400 font-medium text-lg md:text-lg tracking-wide">Bagdogra Small Medium Skill Development Centre</p>
        <p className="text-teal-500/50 font-black text-[10px] mt-8 uppercase tracking-[0.3em]">
            A Strategic Initiative for Excellence
          </p>
        
         
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="h-1 bg-linear-to-r from-teal-500 to-indigo-500 mt-12 mx-auto max-w-xs rounded-full"
        />
      </motion.div>
    </motion.div>
  );
};
 const FlowingWaveBackground = () => {
  return (
    
    <div className=" fixed inset-0 -z-50 overflow-hidden bg-linear-to-r from-cyan-500 to-pink-600 pointer-events-none">
      
       
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-full h-full" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
           
          <motion.path
             
            d="M 1000 1000 C 800 600 200 800 0 500 C 200 200 800 400 1000 0 L 1000 1000 Z"
            
             
            stroke="white"
            strokeWidth="2"
            fill="none"  
            className="opacity-50"
            
            //  ANIMATION 
            animate={{
              
              d: [
                "M 1000 1000 C 800 600 200 800 0 500 C 200 200 800 400 1000 0 L 1000 1000 Z", 
                "M 1000 1000 C 600 800 400 400 0 200 C 400 0 600 200 1000 0 L 1000 1000 Z",   
                "M 1000 1000 C 800 600 200 800 0 500 C 200 200 800 400 1000 0 L 1000 1000 Z"  
              ]
            }}
            transition={{
              duration: 15, 
              ease: "easeInOut",
              repeat: Infinity 
            }}
          />
        </svg>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => setShowIntro(false), 4000);
    return () => clearTimeout(timer);
  }, []);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

   
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-indigo-100 overflow-x-hidden relative">
      <AnimatePresence>
        {showIntro && <IntroScreen />}
      </AnimatePresence>

      <FlowingWaveBackground />
 
   
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-indigo-800 z-110 origin-left" style={{ scaleX }} />

       
<nav className="fixed top-0 w-full z-110 px-8 md:px-20 h-28 flex items-center justify-between 
                bg-transparent border-none transition-all duration-500">
   
  <div className="flex items-center gap-6 cursor-pointer group" 
     onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
  
 
  <img src={logo} alt="Asporea Logo" 
       className="h-42 w-auto object-contain   transition-transform group-hover:scale-105" />
   
  <div className="h-10 w-px bg-white/30 hidden md:block"></div>
  
 
  <div className="hidden md:flex flex-col">
    <span className="text-white font-black text-lg tracking-tighter leading-none uppercase">
      Skill Development
    </span>
    <span className="text-white font-bold text-[12px] tracking-[0.3em] uppercase mt-1">
      Training Centre
    </span>
  </div>
</div>
  
 
  <div className="hidden lg:flex items-center gap-14">
    {['Courses', 'structure', 'assessment', 'timeline'].map((item) => (
      <button 
        key={item} 
        onClick={() => scrollTo(item.toLowerCase())} 
        className="text-white/90 hover:text-white  transition-all font-bold text-xl uppercase tracking-widest relative group"
      >
        {item.toUpperCase()}
      
        <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-linear-to-r from-pink-400 to-white transition-all group-hover:w-full"></span>
      </button>
    ))}
    
   
    <button 
      onClick={() => navigate('/login')}
      className="ml-8 bg-white/10 backdrop-blur-md text-white px-10 py-3 rounded-full font-black 
                 border border-white/20 hover:bg-white hover:text-indigo-600 transition-transform hover:scale-105 
                 active:scale-95 uppercase text-xs tracking-widest shadow-xl"
    >
      Admin Login
    </button>
  </div>
</nav>

      {/*  HERO SECTION */}
      <header className="relative pt-64 pb-32 px-8 md:px-20 overflow-hidden min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="z-10">
            <motion.span variants={fadeInUp} className="inline-block px-5 py-2 mb-8 text-[10px] font-black tracking-[0.3em] text-indigo-700 uppercase bg-white border border-indigo-100 rounded-full shadow-sm">
              Bagdogra SMSDC Training Centre
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-6xl lg:text-8xl font-black text-slate-900 mb-8 leading-[0.85] uppercase tracking-tighter">
              Building <br/> <span className="text-indigo-600">Tomorrow's</span> <br/> Workforce
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-slate-600 font-bold font-sans text-xl mb-12 max-w-lg leading-relaxed normal-case">
              Empowering the community across 35 panchayats through structured skill training and guaranteed placement opportunities via the Tenzing Norway Samiti network.
            </motion.p>
             
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }} 
            animate={{ opacity: 1, scale: 1, x: 0 }} 
            transition={{ duration: 1 }}
            className="relative"
          >
              
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-12 -right-8 z-20 bg-white p-6 rounded-[2.5rem] shadow-2xl border border-indigo-50 flex flex-col items-center"
            >
              
            </motion.div>
            
            <div className="relative h-150 w-full bg-white rounded-[4.5rem] border-16 border-white shadow-[0_50px_100px_-20px_rgba(79,70,229,0.2)] overflow-hidden group">
              <img src={lab} alt="Training Lab" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-linear-to-t from-indigo-900/30 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </header>

      {/*  TARGET AUDIENCE & ELIGIBILITY  */}
      <section className="py-32 px-8 md:px-20">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center"
        >
          <div className="relative order-2 lg:order-1">
             <div className="h-125 bg-slate-100 rounded-[4rem] border-8 border-white shadow-2xl overflow-hidden group">
                <img src={targetImg} alt="Target" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
             </div>
          </div>
          <div className="order-1 lg:order-2">
            <motion.h2 variants={fadeInUp} className="text-5xl font-black mb-12 uppercase text-slate-900 leading-tight tracking-tighter">Target Audience <br/> & Eligibility</motion.h2>
            <div className="space-y-12 text-indigo-600">
              {[
                { icon: <GraduationCap />, title: 'Educational Background', desc: '10th pass to graduates seeking immediate employment opportunities.', color: 'indigo' },
                { icon: <Users />, title: 'Women Candidates', desc: 'Special focus on training women for hostess and customer service roles.', color: 'emerald' },
                { icon: <Smartphone />, title: 'Tech-Savvy Youth', desc: 'Targeting individuals with basic computer skills for certification.', color: 'orange' }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex gap-8 items-start group">
                  <div className={`bg-${item.color}-50 p-5 rounded-3xl text-${item.color}-600 shadow-sm transition-all group-hover:scale-110 group-hover:rotate-3 group-hover:bg-white`}>
                    {React.cloneElement(item.icon, { size: 32 })}
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-base mb-2 text-slate-800">{item.title}</h4>
                    <p className="text-slate-700 text-sm normal-case leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

       {/* TRAINING PROGRAMMES: */}
<section id="courses" className="py-32 px-8 md:px-20 backdrop-blur-sm relative z-10">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-24">
      <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900">Career-Ready Training</h2>
      <div className="h-2 w-32 bg-indigo-600 mx-auto mt-6 rounded-full"></div>
    </div>

    <motion.div 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={staggerContainer} 
      className="grid md:grid-cols-3 gap-12"
    >
      {[
        { 
          icon: <BookOpen />, 
          title: "Tally Accounting", 
          color: "indigo", 
          items: ["GST Compliance", "Tally ERP 9/Prime", "Excel Proficiency","Target Roles - Cashier , Data Entry , Counter Sales Staff , Operator"],
          hoverBg: "hover:bg-indigo-600",
          iconColor: "text-indigo-600"
        },
        { 
          icon: <Users />, 
          title: "Customer Sales Representative", 
          color: "emerald", 
          items: ["Multilingual Comm.", "CRM & Telecalling", "Personality Dev.","Target Roles - CSR ,CCE , Retail Staff , Hostess"],
          hoverBg: "hover:bg-emerald-600",
          iconColor: "text-emerald-600"
        },
        { 
          icon: <Briefcase />, 
          title: "Retail Management", 
          color: "orange", 
          items: ["Store Management", "POS Billing", "Inventory Control" , "Target Roles - Cashier , Counter , Sales , Retail Operations"],
          hoverBg: "hover:bg-orange-600",
          iconColor: "text-orange-600"
        }
      ].map((card, i) => (
        <motion.div 
          key={i} 
          variants={fadeInUp}
          
          className={`p-12 bg-white rounded-[4.5rem] border border-slate-100 
                     ${card.hoverBg} group transition-all duration-500 
                     cursor-pointer shadow-xl hover:-translate-y-4`}
        >
           
          <div className={`${card.iconColor} group-hover:text-white mb-10 transition-colors`}>
            {React.cloneElement(card.icon, { size: 56 })}
          </div>
          
           
          <h3 className="text-3xl font-black mb-8 uppercase text-slate-900 group-hover:text-white transition-colors tracking-tight">
            {card.title}
          </h3>
          
           
          <ul className="text-sm text-slate-500 group-hover:text-white/90 space-y-4 mb-10 normal-case font-bold">
            {card.items.map((li, j) => (
              <li key={j} className="transition-colors">• {li}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

      {/*  STRUCTURE & DELIVERY */}
      <section id="structure" className="py-32 px-8 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="lg:w-1/2">
            <h2 className="text-5xl font-black mb-12 uppercase text-slate-900 leading-tight">Training Structure</h2>
            <div className="grid grid-cols-2 gap-12 mb-16">
              {[
                { label: 'Batch Size', value: '25-30 Candidates' },
                { label: 'Duration', value: '80-100 Hours' },
                { label: 'Schedule', value: '4hrs Daily' },
                { label: 'Assessment', value: 'Fortnightly Mocks' }
              ].map((s, i) => (
                <div key={i} className="group">
                  <h4 className="font-black text-indigo-600 text-xs uppercase tracking-widest mb-2 group-hover:translate-x-2 transition-transform">{s.label}</h4>
                  <p className="text-slate-500 font-black text-2xl tracking-tight">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-6">
              <span className="px-8 py-3 bg-slate-50 rounded-full text-xs font-black uppercase text-indigo-600 shadow-sm border border-indigo-50">Classroom</span>
              <span className="px-8 py-3 bg-slate-50 rounded-full text-xs font-black uppercase text-indigo-600 shadow-sm border border-indigo-50">Practical Lab</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="lg:w-1/2 relative group">
            <div className="relative h-125 w-full bg-slate-100 rounded-[4rem] border-12 border-white shadow-2xl overflow-hidden">
              <img src={training} alt="Training" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-1000" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-12">
                <h3 className="text-2xl font-black text-white uppercase mb-2">Delivery Methods</h3>
                <p className="text-slate-300 text-sm normal-case">Blended approach with real-world technical simulations.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ASSESSMENT FRAMEWORK */}
      <section id="assessment" className="py-32 px-8 md:px-20  backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-black uppercase text-slate-900">Robust Assessment Framework</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { id: '01', title: 'Internal Assessment', icon: <ClipboardList />, color: 'indigo', desc: 'Weekly quizzes to track progress.' },
              { id: '02', title: 'Practical Skills', icon: <MonitorPlay />, color: 'emerald', desc: 'Hands-on evaluation in labs.' },
              { id: '03', title: 'Soft Skills', icon: <Sparkles />, color: 'orange', desc: 'Confidence and grooming checks.' },
              { id: '04', title: 'Joint Certification', icon: <FileBadge />, color: 'purple', desc: 'Recognised industry certificates.' }
            ].map((step, i) => (
              <motion.div 
                key={i} whileHover={{ y: -12 }}
                className={`group bg-white p-10 rounded-[4rem] border border-slate-100 hover:bg-${step.color}-600 transition-all duration-500 shadow-sm hover:shadow-2xl cursor-pointer`}
              >
                <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-md text-${step.color}-600 group-hover:bg-white/20 group-hover:text-black transition-all`}>
                  {React.cloneElement(step.icon, { size: 32 })}
                </div>
                <div className="text-slate-500 font-black mb-4 group-hover:text-black transition-colors">{step.id}</div>
                <h4 className="font-black text-sm uppercase mb-4 group-hover:text-black transition-colors tracking-tight">{step.title}</h4>
                <p className="text-[13px] text-slate-500 normal-case leading-relaxed group-hover:text-black transition-colors  font-black">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*  PLACEMENT PATHWAY  */}
      <section id="placement" className="py-32 px-8 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900">Placement Pathway</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <motion.div whileHover={{ scale: 1.02 }} className="p-16 bg-slate-900 rounded-[5rem] text-white shadow-2xl group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5"><TrendingUp size={200} /></div>
               <h3 className="text-3xl font-black mb-8 uppercase text-indigo-400">Domestic</h3>
               <p className="text-slate-400 text-lg leading-relaxed mb-10 normal-case font-bold">Active partnerships with leading retail chains and BPOs across India.</p>
               <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest"><CheckCircle className="text-green-400" /> Leading Retail Chains</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="p-16 bg-indigo-600 rounded-[5rem] text-white shadow-2xl group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-10"><Globe size={200} /></div>
               <h3 className="text-3xl font-black mb-8 uppercase text-indigo-100">International</h3>
               <p className="text-indigo-100 text-lg leading-relaxed mb-10 normal-case font-bold">Exciting opportunities in Gulf countries with competitive packages.</p>
               <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest"><Globe size={20} /> Gulf Retail Careers</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* YEKKIN SCHEME */}
      <motion.section 
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        className="py-32 px-8 md:px-20 bg-slate-900 rounded-[6rem] mx-8 md:mx-20 overflow-hidden relative group"
      >
        <div className="absolute inset-0 bg-indigo-600/10 group-hover:bg-indigo-600/20 transition-colors"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
            <Globe className="mx-auto text-indigo-400 mb-10 opacity-40" size={80} />
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-black mb-12 uppercase text-white tracking-tighter italic">International YEKKIN Scheme</h2>
          <div className="bg-white/5 border border-white/10 p-16 rounded-[4.5rem] backdrop-blur-2xl">
            <p className="text-indigo-100 text-3xl md:text-4xl font-black italic normal-case leading-tight mb-10">
              "Candidates receive <span className="text-white underline decoration-indigo-500">100% sponsorship</span> for overseas placement opportunities."
            </p>
            <p className="text-slate-500 text-xs uppercase font-black tracking-[0.4em]">Zero-cost international career pathways.</p>
          </div>
        </div>
      </motion.section>

      {/*  TIMELINE */}
      <section id="timeline" className="py-32 px-8 md:px-20  ">
        <div className="max-w-7xl mx-auto text-center  ">
          <h2 className="text-5xl font-black uppercase  text-slate-900 mb-24 tracking-widest ">Implementation Timeline</h2>
          <div className="grid md:grid-cols-4 gap-12 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-indigo-100 -translate-y-1/2 -z-10  "></div>
            {[
              { m: 'Month 1', t: 'Foundation', p: '1', i: <ShieldCheck />, c: 'indigo', d:'Centre infrastructure setup , community mobilisation compaigns across all panchayats' },
              { m: 'Month 2', t: 'Training Delivery', p: '2', i: <MonitorPlay />, c: 'emerald' , d:'First batch enrollment , intensive training delivery with continuous mid term assessments and progress monitoring '},
              { m: 'Month 3', t: 'Placement Drive', p: '3', i: <Award />, c: 'indigo' , d:'Employer engagement , job interviews , and successful placement opportunities of trained candidates in verified  positions' },
              { m: 'Ongoing', t: 'Scale-Up', p: '4', i: <TrendingUp />, c: 'emerald' ,d:'Continuous batch operations with enhanced international placement linkages and programme expansion'}
            ].map((step, i) => (
              <motion.div 
                key={i} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: i % 2 !== 0 ? 70 : -10  
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`bg-white p-10 rounded-[4rem] border border-slate-100 shadow-xl relative ${i % 2 !== 0 ? 'lg:mt-20' : ''}`}
              >
                <div className={`w-16 h-16 bg-${step.c}-600 text-white rounded-3xl flex items-center justify-center mb-8 shadow-xl`}>
                  {React.cloneElement(step.i, { size: 32 })}  
                </div>
                <h4 className="font-black text-indigo-600 text-[10px] tracking-widest uppercase mb-2">{step.m}</h4> 
                <h3 className="font-black text-slate-900 text-xl uppercase tracking-tight">{step.t}</h3>  
                <p className="text-slate-500 text-[12px] mt-4 font-bold leading-relaxed">
            {step.d}
          </p>
                <div className="absolute -top-8 -right-4 text-9xl font-black text-slate-100/50 -z-10">{step.p}</div>  
              </motion.div>
            ))}
          </div>
        </div>
      </section>
<MissionSection/>
      {/*  FOOTER */}
      <footer className="py-32 px-8 md:px-20 bg-slate-900 rounded-t-[6rem] overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-24 items-start mb-24">
            <div className="flex flex-col items-start">
              <img src={footerLogo} alt="Logo" className="h-32 w-auto object-contain mb-8 hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <h4 className="text-indigo-500 font-black text-xs uppercase tracking-widest mb-6">Visit to our Official Website</h4>
              <p className="text-white font-black text-sm mb-6 leading-tight uppercase">Asporea Human Resource Consultants Pvt. Ltd.</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-400 group cursor-pointer hover:text-white transition-all">
                  <MapPin size={20} className="text-indigo-500" />
                  <span className="text-[11px] font-black tracking-widest uppercase">Bagdogra Centre , West Bengal</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400 group cursor-pointer hover:text-white transition-all">
                  <Globe size={20} className="text-indigo-500" />
                  <a href="https://www.asporea.co.in" target="_blank" className="text-[11px] font-black tracking-widest uppercase underline">www.asporea.co.in</a>
                </div>
              </div>
            </div>
            <div className="relative group flex justify-end">
              <div className="absolute -inset-6 bg-indigo-600/10 rounded-[4rem] rotate-3 blur-2xl"></div>
              <div className="relative w-80 h-48 bg-slate-800 rounded-[3.5rem] border-4 border-white/10 shadow-3xl overflow-hidden">
                <img src={footerThumb} alt="Footer" className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-2000" />
              </div>
            </div>
          </div>
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-500 text-[10px] font-black tracking-[0.5em] italic uppercase">Invented for lives....</p>
            <p className="text-slate-600 text-[10px] font-black tracking-[0.2em] uppercase">© 2026 All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      
    </div>
  );
};

export default LandingPage;
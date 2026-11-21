const make = (n, title, subject, classLevel, mode, monthlyFee, tutorName) => ({
  _id: `sample-${n}`, href: "/tuitions", title, subject, classLevel, mode, monthlyFee, tutorName, bannerImage: "",
});

export const sampleTuitions = [
  make(1, "SSC Mathematics Crash Batch", "Mathematics", "SSC", "Offline", 3500, "Nusrat Jahan"),
  make(2, "HSC Physics Concept Builder", "Physics", "HSC", "Online", 3000, "Imran Hossain"),
  make(3, "IELTS Band 7+ Intensive", "IELTS", "Professional", "Online", 5500, "Farhana Rahman"),
  make(4, "Python for Beginners", "Programming", "University", "Online", 4500, "Tanvir Alam"),
  make(5, "Class 8 English Grammar & Writing", "English", "Class 6-8", "Offline", 2500, "Farhana Rahman"),
  make(6, "HSC Chemistry: Organic Made Easy", "Chemistry", "HSC", "Offline", 3200, "Imran Hossain"),
];
import Image from 'next/image';

export default function About() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-32 bg-gray-100 ">
        <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 flex justify-center items-center mb-8 md:mb-0">
              <div className="relative w-48 h-48 rounded-full overflow-hidden">
                <Image
                  src="/logo.jpg"
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">About Me</h1>
              <p className="text-gray-600 text-lg mb-4">
                Hello! I'm Sandeep Kothapalli, a seasoned Technical Lead with over 12 years of experience in designing, developing, and optimizing scalable web applications. My expertise lies in ASP.NET, .NET Core, Web API, SQL Server, and cloud-based solutions using Azure.
              </p>
              <p className="text-gray-600 text-lg">
                Passionate about crafting high-performance applications, I specialize in software architecture, backend development, and cloud computing. I enjoy mentoring teams, solving complex technical challenges, and sharing insights on best practices in modern software development.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">My Professional Journey</h2>
            <p className="mt-4 text-lg text-gray-600">
              With a strong background in enterprise application development, I have led projects that enhance efficiency, scalability, and user experience.
            </p>
          </div>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3">
                <img src="/3.jpg" alt="Software Development" className="w-full rounded-lg shadow-lg" />
              </div>
              <div className="md:w-2/3 md:pl-8 mt-8 md:mt-0">
                <h3 className="text-2xl font-bold text-gray-800">Technical Leadership</h3>
                <p className="mt-4 text-gray-600">
                  As a Technical Lead at Progience Technologies, I oversee the development of enterprise-grade solutions, guiding teams through best practices in software engineering, cloud computing, and system architecture.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/3">
                <img src="/2.jpg" alt="Cloud and API Development" className="w-full rounded-lg shadow-lg" />
              </div>
              <div className="md:w-2/3 md:pr-8 mt-8 md:mt-0">
                <h3 className="text-2xl font-bold text-gray-800">Cloud & API Development</h3>
                <p className="mt-4 text-gray-600">
                  I have extensive experience in designing RESTful APIs, integrating cloud-based solutions with Azure, and optimizing database performance for large-scale applications.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3">
                <img src="/1.jpg" alt="Mentorship and Learning" className="w-full rounded-lg shadow-lg" />
              </div>
              <div className="md:w-2/3 md:pl-8 mt-8 md:mt-0">
                <h3 className="text-2xl font-bold text-gray-800">Mentorship & Learning</h3>
                <p className="mt-4 text-gray-600">
                  I actively mentor junior developers, conduct training sessions, and contribute to the development community through knowledge-sharing initiatives and blog articles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

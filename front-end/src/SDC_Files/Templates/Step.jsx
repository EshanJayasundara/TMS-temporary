export const Step = () => {
  const steps = [
    {
      title: "Announce",
      description:
        "All recipes are written using certain conventions, which define the characteristics of common ingredients. The rules vary from place to place.",
      link: "http://localhost:5173/sdc/announce",
    },
    {
      title: "Add Faculty",
      description:
        "A flower in my garden, a mystery in my panties. Heart attack never stopped old Big Bear. I didn't even know we were calling him Big Bear.",
      link: "http://localhost:5173/sdc/faculty/save",
    },
    {
      title: "Add Department",
      description:
        "A flower in my garden, a mystery in my panties. Heart attack never stopped old Big Bear. I didn't even know we were calling him Big Bear.",
      link: "http://localhost:5173/sdc/department/save",
    },
    {
      title: "Add Lecturers",
      description:
        "A flower in my garden, a mystery in my panties. Heart attack never stopped old Big Bear. I didn't even know we were calling him Big Bear.",
      link: "http://localhost:5173/sdc/applicant/save",
    },
    {
      title: "Prepare Applications",
      description:
        "The first mate and his Skipper too will do their very best to make the others comfortable in their tropic island nest. Michael Knight a young loner.",
      link: "http://localhost:5173/sdc/application/create", 
    },
    {
      title: "Send Applications",
      description:
        "The first mate and his Skipper too will do their very best to make the others comfortable in their tropic island nest. Michael Knight a young loner.",
      link: "http://localhost:5173/sdc/invite",
    },
    {
      title: "View Applications",
      description:
        "The first mate and his Skipper too will do their very best to make the others comfortable in their tropic island nest. Michael Knight a young loner.",
      link: "http://localhost:5173/sdc/allApplications",
    },
  ];

  return (
    <div className="px-4 py-2 mx-auto max-w-screen-md md:px-8 lg:px-4">
      <div className="grid max-w-md mx-auto gap-4">
        {steps.map((step, index) => (
          <a key={index} href={step.link} className="block">
            <div className="group flex">
              <div className="flex flex-col items-center mr-5">
                <div className="w-px h-6 opacity-0 sm:h-full" />
                <div>
                  <div className="flex items-center group-hover:bg-amber-200 transition-color duration-300 ease-in-out justify-center w-4 h-4 text-xs font-bold border rounded-full">
                    {index + 1}
                  </div>
                </div>
                <div className="w-px h-full" />
              </div>
              <div className="flex flex-col pb-2 sm:items-center sm:flex-row sm:pb-0 transition-transform transform hover:scale-105">
                <div className="sm:mr-2">
                  <div className="flex items-center justify-center w-8 h-8 my-1 rounded-full bg-gray-800 group-hover:bg-amber-300 transition-color duration-300 ease-in-out sm:w-10 sm:h-10">
                    <svg
                      className="w-6 h-6 text-white sm:w-8 sm:h-8"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-base font-semibold sm:text-sm">{step.title}</p>
                  <p className="text-xs text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>

  );
};

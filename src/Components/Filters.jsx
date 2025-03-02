import React from 'react';

function Filters({
  salaryMin,
  setSalaryMin,
  salaryMax,
  setSalaryMax,
  jobType,
  setJobType,
  jobMode,
  setJobMode,
  roleType,
  setRoleType,
  experience,
  setExperience,
  fetchSearchData,
}) {

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(salaryMin, salaryMax, jobType, jobMode, roleType, experience);
  };

  return (
    <div className="min-h-screen">
      <div className="w-[335px] h-full">
        <div className="flex justify-between py-6">
          <h3 className="text-2xl font-bold">Filters</h3>
          <p
            className="font-medium text-gray-400 clearBtn"
            onClick={() => {
              setSalaryMin('');
              setSalaryMax('');
              setJobType('');
              setJobMode(['All']);
              setRoleType('');
              setExperience('');
            }}
          >
            Clear all
          </p>
        </div>
        <div className="w-[335px] bg-slate-200 h-[500px] rounded-lg py-10 px-9">
          <div className="relative h-full overflow-y-auto scroll-none">
            <form>
              {/* Salary Range */}
              <div className="py-5">
                <div className="text-lg font-medium">Salary Range</div>
                <div className="flex justify-between py-4">
                  <input
                    type="number"
                    className="w-[120px] h-[35px] px-2 rounded-lg focus:outline-none"
                    placeholder="Min (in LPA)"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                  />
                  <input
                    type="number"
                    className="w-[120px] h-[35px] px-2 rounded-lg focus:outline-none"
                    placeholder="Max (in LPA)"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full h-[2px] bg-zinc-400"></div>

              {/* Job Type */}
              <div className="py-5">
                <div className="text-lg font-medium">Job Type</div>
                {['All', 'Full Time', 'Part Time', 'Internships'].map((type) => (
                  <div key={type}>
                    <input
                      type="radio"
                      id={type}
                      name="jobType"
                      value={type}
                      checked={type === 'All' ? jobType === '' : jobType === type}
                      onChange={() => setJobType(type === 'All' ? '' : type)}
                    />
                    <label htmlFor={type} className="ml-2">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
              <div className="w-full h-[2px] bg-zinc-400"></div>

              {/* Work Mode */}
              <div className="py-5">
                <div className="text-lg font-medium">Work Mode</div>
                {['All', 'office', 'remote', 'hybrid'].map((mode) => (
                  <div key={mode}>
                    <input
                      type="checkbox"
                      id={mode}
                      name="jobMode"
                      value={mode}
                      checked={jobMode.includes(mode)}
                      onChange={() =>
                        setJobMode((prev) => {
                          if (mode === 'All') {
                            return prev.includes('All') ? [] : ['All']; // If "All" is unchecked, clear selection; else, select "All" only
                          } else {
                            const newSelection = prev.includes(mode)
                              ? prev.filter((m) => m !== mode) // Remove if already selected
                              : [...prev.filter((m) => m !== 'All'), mode]; // Remove "All" and add new selection

                            return newSelection.length === 3 ? ['All', ...newSelection] : newSelection; // Select "All" if all are selected
                          }
                        })
                      }
                    />
                    <label htmlFor={mode} className="ml-2">
                      {mode}
                    </label>
                  </div>
                ))}
              </div>
              <div className="w-full h-[2px] bg-zinc-400"></div>

              {/* Role Type */}
              <div className="py-5">
                <div className="text-lg font-medium">Role Type</div>
                {['IT', 'Non-IT'].map((role) => (
                  <div key={role}>
                    <input
                      type="radio"
                      id={role}
                      name="roleType"
                      value={role}
                      checked={roleType === role}
                      onChange={() => setRoleType(role)}
                    />
                    <label htmlFor={role} className="ml-2">
                      {role}
                    </label>
                  </div>
                ))}
              </div>
              <div className="w-full h-[2px] bg-zinc-400"></div>

              {/* Experience Level */}
              <div className="py-5">
                <div className="text-lg font-medium">Work Experience</div>
                <div className="flex justify-between py-4">
                  <input
                    type="number"
                    name="experience"
                    value={experience}
                    className="w-[250px] h-[35px] px-2 rounded-lg focus:outline-none"
                    placeholder="Min Experience (in Years)"
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
                {/* {[
                  'Fresh/Entry-Level',
                  'Junior',
                  'Mid-Level',
                  'Senior',
                  'Lead/Managerial',
                  'Director/Executive',
                ].map((level) => (
                  <div key={level}>
                    <input
                      type="radio"
                      id={level}
                      name="experience"
                      value={level}
                      checked={experience === level}
                      onChange={() => setExperience(level)}
                    />
                    <label htmlFor={level} className="ml-2">
                      {level}
                    </label>
                  </div>
                ))} */}
              </div>

              {/* Apply Button */}
              <div>
                <button
                  type="button"
                  className="contactBtn py-2 px-4 bg-blue-600 text-white rounded-md"
                  onClick={fetchSearchData}
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;

import React from 'react';
import ModifyCourseForm from './ModifyCourseForm';

const CreateSection = () => {

  return (
    <div className="rs-about style1 pt-82 pb-100 md-pt-50 md-pb-60 text-center">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12">
            {/* Section CourseForm Start */}
            <div className="padding-0 mx-auto">
              <ModifyCourseForm/>
            </div>
            {/* Section CourseForm End */}
          </div>
        </div>
      </div>
    </div>

  );
}

export default CreateSection;
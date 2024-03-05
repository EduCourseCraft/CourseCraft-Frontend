import React from 'react';
import AddCourseForm from './AddCourseForm';

const CreateSection = () => {

  return (
    <div className="rs-about style1 pt-82 pb-100 md-pt-50 md-pb-60 text-center">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12">
            {/* Section CourseForm Start */}
            <div className="padding-0 mx-auto">
              <AddCourseForm />
            </div>
            {/* Section CourseForm End */}
          </div>
        </div>
      </div>
    </div>

  );
}

export default CreateSection;
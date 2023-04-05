# Carrier Fair 2023

## Student

### Modal

-   name
-   indexNumber
-   email
-   CVUrl
-   preferenceCarrierChoise []
-   profilePhoto
-   preferenceList []
-   interviewsList []

### API Structure

-   /student/signup
-   /student/update
-   /student/uploadCV
-   /student/getCV
-   /student/getInterviews
-   /student/getPreferences
-   /student/updateInterviews
-   /student/updateProfilePhoto

## Company

### Modal

-   name
-   email
-   profilePhoto
-   studentCount
-   interviewsList []
-   startTime
-   endTime
-   requirements

### API Structure

-   /company/add
-   /company/update
-   /company/updateInterviewList
-   /company/updateInterview
-   /company/updateProfilePhoto

## Admin

### Modal

-   name
-   email

### API Structure

-   /admin/updateInterviews
-   /admin/getInterviewsPerCompany
-   /admin/getStudents
-   /admin/getCompanies
-   /admin/getCV

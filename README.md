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
-   interviewQueue []

### API Structure

-   /student/signup
-   /student/update
-   /student/getStudents
-   /student/getStudent
-   /student/getCV
-   /student/uploadCV
-   /student/updateInterviews
-   /student/updateInterviesQueue
-   /student/updatePreferences
-   /student/updateProfilePhoto

## Company

### Modal

-   name
-   email
-   profilePhoto
-   maximumInterviews
-   interviewsList []
-   startTime
-   endTime
-   requirements

### API Structure

-   /company/add
-   /company/update
-   /company/updateProfilePhoto
-   /company/getCompany
-   /company/getCompanies

## Admin

### Modal

-   name
-   email

### API Structure

-   /admin/exportData
-   /admin/add

## Global

### Modal

-   registrationDeadLine
-   eventDate

### API Structure

-   /global/setRegistrationDeadLine
-   /global/setEventDate

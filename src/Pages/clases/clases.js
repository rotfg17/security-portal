class project {
    constructor(projectCode, projectName, projectScheme,
        cpp,projectTime)
        {
            this.projectCode = projectCode;
            this.projectName = projectName;
            this.projectScheme = projectScheme;
            this.cpp = cpp;
            this.projectTime = projectTime;
    }

    displayinfo(){
       return JSON.stringify(this);
    }
}
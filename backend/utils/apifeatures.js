//this class if for searching things

class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    };//this.querystr is an object, in js all objects r passed through refrence
    
    search() {
        const keyword = this.queryStr.keyword
          ? {
              name: {
                $regex: this.queryStr.keyword,
                $options: "i",//case insensitive
              },
            }
          : {};
    
          console.log(keyword);
        this.query = this.query.find({...keyword});
        
        return this;
      };

      filter() {
        const queryCopy = { ...this.queryStr };
        //   Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
    
        removeFields.forEach((key) => delete queryCopy[key]);

        console.log(queryCopy);
    
        // Filter For Price and Rating
    
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        console.log(queryStr);
    
        this.query = this.query.find(JSON.parse(queryStr));
    
        return this;
      }
      //const qucopy = this.querystr->it will not assign value..bcz its a refrence to that obj so if we change the value of qucopy it will automatically update this.querystr
      
      pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
    
        const skip = resultPerPage * (currentPage - 1);
    
        this.query = this.query.limit(resultPerPage).skip(skip);
    
        return this;
      }
};

module.exports = ApiFeatures;  
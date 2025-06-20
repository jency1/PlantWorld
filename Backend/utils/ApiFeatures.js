class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // search() {
  //   if (this.queryString.search) {
  //     const searchRegex = new RegExp(this.queryString.search, 'i'); // case-insensitive
  //     console.log(searchRegex);
  //     this.query = this.query.find({
  //       $or: [
  //         { name: searchRegex },
  //         { description: searchRegex },
  //         { shortDescription: searchRegex },
  //       ],
  //     });
  //   }

  //   return this;
  // }

  search() {
    if (this.queryString.search) {
      const searchRegex = new RegExp(this.queryString.search, 'i'); // case-insensitive
      console.log('Regex:', searchRegex);
      console.log('Running query with:', {
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { shortDescription: searchRegex },
        ],
      });
      this.query = this.query.find({
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { shortDescription: searchRegex },
        ],
      });
      // To get execution stats and see how MongoDB is interpreting the query
    }

    return this;
  }

  // filter() {
  //   // console.log('shreya');

  //   // 1A)filtering
  //   const queryObj = { ...this.queryString };
  //   const excludedFields = ['page', 'sort', 'limit', 'fields'];
  //   excludedFields.forEach((el) => delete queryObj[el]);

  //   // Handle comma-separated values like 'Indoor,Outdoor'
  //   Object.keys(queryObj).forEach((key) => {
  //     if (typeof queryObj[key] === 'string' && queryObj[key].includes(',')) {
  //       queryObj[key] = { $in: queryObj[key].split(',') };
  //     }
  //   });

  //   // 1B)Advanced filtering
  //   let queryString = JSON.stringify(queryObj);
  //   queryString = queryString.replace(
  //     /\b(gte|gt|lte|lt)\b/g,
  //     (match) => `$${match}`
  //   );

  //   // console.log(JSON.parse(queryString));
  //   // mongoose {tag:'Indoor' , price:{$gte:200}}
  //   // req.query { tag: 'Indoor', price: { gte: '200' } }

  //   this.query = this.query.find(JSON.parse(queryString));
  //   return this;
  //   // let query = Plant.find(JSON.parse(queryString));
  // }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Handle comma-separated values
    Object.keys(queryObj).forEach((key) => {
      if (typeof queryObj[key] === 'string' && queryObj[key].includes(',')) {
        queryObj[key] = { $in: queryObj[key].split(',') };
      }
    });

    if (Object.keys(queryObj).length > 0) {
      // Only apply filter if there are actual filters
      let queryString = JSON.stringify(queryObj);
      queryString = queryString.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );

      this.query = this.query.find(JSON.parse(queryString));
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 12;
    const skip = (page - 1) * limit;
    // page=2&limit=10  , 1-10 , page-1 , 11-20 , page-2
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;

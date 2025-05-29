// TASK TWO


db.books.find({ genre: 'Fiction' });
// 4 books

db.books.find({ published_year: 1847 })
// 1 book was published in 1847

db.books.find({ author: 'Emily Brontë' });
// 1 book by Emily Brontë

db.books.updateOne({ title: 'The Lord of the Rings' }, { $set: { price: 1.99 } });

db.books.deleteOne({ title: '1984' });


// TASK THREE


db.books.find({ in_stock: true, published_year: { $gt: 2010 } });
// none

db.books.find({}, { title: 1, author: 1, price: 1});

db.books.find().sort({ price: 1 });  
db.books.find().sort({ price: -1 }); 

db.books.find().skip(0).limit(5);  

db.books.find().skip(5).limit(5);  


// TASK FOUR

db.books.aggregate([
  { $group: { _id: '$genre', 
    avgPrice: { $avg: '$price' } } }
]);

// [
//   { _id: 'Fiction', avgPrice: 10.74 },
//   { _id: 'Fantasy', avgPrice: 8.49 },
//   { _id: 'Romance', avgPrice: 7.99 },
//   { _id: 'Political Satire', avgPrice: 8.5 },
//   { _id: 'Adventure', avgPrice: 12.5 },
//   { _id: 'Gothic Fiction', avgPrice: 9.99 },
//   { _id: 'Dystopian', avgPrice: 11.5 }
// ]


db.books.aggregate([
  { $group: { _id: '$author', 
    count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// [ { _id: 'J.R.R. Tolkien', count: 2 } ]



db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ['$published_year', 10] } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $concat: [ { $toString: { $multiply: ['$_id', 10] } }, 's' ] },
      count: 1,
      _id: 0
    }
  }
]);

// [
//   { count: 1, decade: '1920s' },
//   { count: 1, decade: '1810s' },
//   { count: 1, decade: '1980s' },
//   { count: 2, decade: '1950s' },
//   { count: 1, decade: '1850s' },
//   { count: 2, decade: '1930s' },
//   { count: 1, decade: '1840s' },
//   { count: 1, decade: '1960s' },
//   { count: 1, decade: '1940s' }
// ]


// TASK FIVE


db.books.createIndex({ title: 1 });
// title_1

db.books.createIndex({ author: 1, published_year: -1 });
// author_1_published_year_-1


db.books.find({ title: '1984' }).explain('executionStats');

db.books.find({ author: 'George Orwell', published_year: 1949 }).explain('executionStats');

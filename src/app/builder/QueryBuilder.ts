import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this.query.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }

    return this;
  }

  filter(){
    const queryObject = {...this.query};

    const excluedFieds = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excluedFieds.forEach(el => delete queryObject[el]);

    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);

    return this
  }

  sort(){
    const sort = (this?.query?.sort as string)?.split(',')?.join(" ") || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  paginate(){
    const page = Number(this?.query.page) || 1;
    const limit = Number(this?.query?.limit) || 10;;
    const skip = (page - 1 ) * limit;

    this.modelQuery = this.modelQuery.skip(page).limit(limit);
    return this;
  }

  fields(){
    const fields = (this?.query.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }


}


export default QueryBuilder;
export type BookState = {
    id: string;
    title: string | undefined;
    author: string | undefined;
};

export interface FloodReports  {
    status: String;
    data: Array<Data>
};

export type Data = {
    _id: String;
    update_logs: Array<UpdateLog>;
    location: Location;
    flood_type: String;
    flood_unit: String;
    flood_time: FloodTime;
    water_level: String;
    is_frequent: Boolean;
    status: String;
    create_time: String;
    approved_time: String;
    source: String;
    reporter_name: String;
    reviewer_id: String;
    reviewer_name: String;
    flood_period_id: String;
    images: Array<Image>
};

export type UpdateLog = {
    status: String;
    time: String;
    update_by: String;
};

export type FloodTime = {
    start_time: String;
    end_time: String;
};

export type Image = {
    img_url: String;
};

export type Location = {
    type: String;
    coordinates:Array<String>
    address:String
    street_name:String
    ward_name:String
    district_name:String
};




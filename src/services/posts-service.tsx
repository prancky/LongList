import axios from 'axios';

type PostsApiClient = {
  postsApiClient: any;
};

export class PostService {
  private static _instance: PostService = new PostService();

  private _postsApiClient?: any;

  constructor() {
    if (PostService._instance) {
      throw new Error(
        'Error: Instantiation failed: Use PostService.getInstance() instead of new.',
      );
    }
    PostService._instance = this;
  }

  public static instance(): PostService {
    return PostService._instance;
  }

  public initClients = (clients: PostsApiClient) => {
    this._postsApiClient = clients.postsApiClient;
  };

  getPostsList = async () => {
    // if (this._postsApiClient) {
    //   // const response = await this._postsApiClient.get('posts');
    //
    // } else {
    //   throw new Error('Posts Api Client is not registered');
    // }
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
    );
    return response.data;
  };
}

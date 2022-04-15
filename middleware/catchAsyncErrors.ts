interface RequestInterface {
  body: {
    name: string;
    type: string;
    ownerName: string;
    ownerAddress: string;
    ownerPhoneNumber: string;
  };
  params: {
    id: string;
  };
}

interface ResponseInterface {
  success: boolean;
  patient: RequestInterface;
  status: (n: number) => {
    json: (a: any) => any;
  };
  send: (s: string) => void;
}

module.exports =
  (theFunc: any) =>
  (req: RequestInterface, res: ResponseInterface, next: any) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };

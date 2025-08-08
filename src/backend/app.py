from flask import Flask, request            # For flask and request(GET,POST,DELETE,UPDATE)
from flask_restful import Resource, Api     # For resource and api
import pickle                               # To load model
import pandas as pd                         # For data processing
from flask_cors import CORS                 # Cross origin



app = Flask(__name__)
#
CORS(app)
# creating an API object
api = Api(app)

#prediction api call
class prediction(Resource):
    def get(self,budget):
        #budget = request.args.get('budget')
        print(budget)
        # Load the package
        # budget to int
        budget = [int(budget)]
        # budget to data frame
        df = pd.DataFrame(budget, columns=['Marketing Budget (X) in Thousands'])
        #load model
        model = pickle.load(open('./model/simple_linear_regression.pkl','rb'))
        prediction=model.predict(df)
        prediction= int(prediction[0])
        return str(prediction)


#data api
class getData(Resource):
    def get(self):
        df = pd.read_excel('./data/data.xlsx')
        #rename column
        df = df.rename({'Marketing Budget': 'budget', 'Actual Sales': 'sale'}, axis=1) 
        #print(df.head())
        #out= {'key':str}
        res=df.to_json(orient='records')
        #print(_res)
        return res

#add end point
api.add_resource(getData,'/api')
api.add_resource(prediction,'/prediction/<int:budget>')


if __name__ == '__main__':
    app.run(debug=True)
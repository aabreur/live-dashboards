require "sinatra"
require "sinatra/sse"
require 'thin'
require 'json'



class LiveApp < Sinatra::Base
    include Sinatra::SSE

    DASHBOARDS = {
    	'teste' => {
    		'items' => [
    			{'widget': 'example', 'id': 1}, 
    			{'widget': 'example', 'id': 2}
    		],
    		'tick' => 1
    	}
    }

    get "/dashboard/:dashboard" do
    	erb :index
	end

	get "/config/:dashboard" do
		content_type :json
		DASHBOARDS[params[:dashboard]]['items'].to_json
	end

    get '/data/:dashboard' do
    	@dashboard_name = params[:dashboard]
    	@dashboard = DASHBOARDS[@dashboard_name]

		puts "New sse conection for #{@dashboard_name}"

		sse_stream do |out|
			out.push event: "message", data: "starting this crap for #{@dashboard_name}"
			EM.add_periodic_timer(@dashboard['tick']) do 
		        data = { time: Time.now.to_i, strings: ["lalala", @dashboard_name] }
				puts "Sending message for #{@dashboard_name}"
				out.push event: "message", data: data.to_json
			end
		end
	end
end

run LiveApp
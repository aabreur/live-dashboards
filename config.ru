require "sinatra"
require "sinatra/sse"
require 'thin'
require 'json'



class LiveApp < Sinatra::Base
    include Sinatra::SSE
	def get_random_data(items)
		items.map { |item| { 'id' => item['id'], 'wdata' => {'value' => rand(item['source'])} } }
	end

    DASHBOARDS = {
    	'teste' => {
    		'items' => [
    			{'widget' => 'example', 'source' => 30, 'id' => 'uniq_1'}, 
    			{'widget' => 'example', 'source' => 90, 'id' => 'uniq_2'}
    		],
    		'tick' => 3
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
			out.push event: "message", data: get_random_data(@dashboard['items']).to_json
			EM.add_periodic_timer(@dashboard['tick']) do 
				data = get_random_data(@dashboard['items'])
				puts "Sending message for #{@dashboard_name} #{data}"
				out.push event: "message", data: data.to_json
			end
		end
	end
end

run LiveApp
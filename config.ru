require "sinatra"
require "sinatra/sse"
# require 'thin'

# class LiveApp < Sinatra::Base
    include Sinatra::SSE

    get "/" do
        erb :index
    end

    get '/data/:dashboard' do
		puts "New sse conection for #{params[:dashboard]}"
		type = params[:type]

		sse_stream do |out|
			EM.add_periodic_timer(10) do 
		        data = { time: Time.now.to_i, strings: ["lalala", "AAAKKKALA"] }
				puts "Sending message for #{params[:dashboard]}"
				out.push event: "message", data: env.stats.to_json
			end
		end
	end
# end

# run LiveApp
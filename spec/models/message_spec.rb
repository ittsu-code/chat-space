require 'rails_helper'

describe Message do
    describe '#create' do
    
    it "is valid without a text" do
      message = build(:message, text: nil)
      message.valid?
      expect(message).to be_valid
    end

    it "is valid without an image" do
      message = build(:message, image: nil)
      message.valid?
      expect(message).to be_valid
    end

    it "is valid with a text and an image" do
      message = build(:message)
      message.valid?
      expect(message).to be_valid
    end
  end

  describe '#create fail' do
  it "is valid without a text and an image" do
      message = build(:message, text: nil, image: nil)
      message.valid?
      expect(message.errors[:text]).to include("を入力してください")
    end

    it "is valid without an user_id" do
      message = build(:message, user: nil)
      message.valid?
      expect(message.errors[:user]).to include("を入力してください")
    end

    it "is valid with a text and a group_id" do
      message = build(:message, group: nil)
      message.valid?
      expect(message.errors[:group]).to include("を入力してください")
    end
  end

end

# * メッセージを保存できる場合
#      メッセージがあれば保存できる
#      画像があれば保存できる
#      メッセージと画像があれば保存できる
#  メッセージを保存できない場合
#      メッセージも画像も無いと保存できない
#      group_idが無いと保存できない
#      user_idが無いと保存できない
